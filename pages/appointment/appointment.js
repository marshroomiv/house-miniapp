import { CommonService } from '../../services/common-service'
import { CustomizedAppointmentMutator } from '../../services/customized/mutator/customized-appointment-mutator'

const app = getApp()

const commonService = new CommonService()
const customizedAppointmentMutator = new CustomizedAppointmentMutator()

Page({
    data: {
        time: '13:00',
        requirementIndex: 0,
        requirementTypeCode: 'BUY',
        requirements: ['买房', '卖房', '租房', '出租'],
        requirementTypeCodes: ['BUY', 'SELL', 'RENT', 'FOR_RENT']
    },
    onLoad: function(options) {

        if(options.agentName!=null){
            this.setData({agentName: decodeURIComponent(options.agentName), agentPhone:options.agentPhone, houseUid: options.houseUid, houseTitle: decodeURIComponent(options.houseTitle),
                houseCoverPicturePath: options.houseCoverPicturePath, requirementTypeCode: options.requirementTypeCode})

            if(options.requirementTypeCode=='RENT'){
                this.setData({requirementIndex: 2})
            }
        }

        let minDate = new Date()
        let maxDate = new Date()

        minDate.setDate(minDate.getDate() + 1)
        maxDate.setDate(maxDate.getDate() + 10)
        let date = app.services.utilService.getDate(minDate)

        this.setData({date: date, minDate: date, maxDate: app.services.utilService.getDate(maxDate)})
    },
    onRequirementChange: function(e) {
        this.setData({
            requirementIndex: e.detail.value,requirementTypeCode: this.data.requirementTypeCodes[e.detail.value]
        })
    },
    onDateChange:function(e){
        this.setData({date: e.detail.value})
    },
    onTimeChange:function(e){
        this.setData({time: e.detail.value})
    },
    getName:function(e){
        commonService.getUserInfo((user)=>{
            this.setData({name: user.nickName})
        })
    },
    getPhoneNumber:function(e){
        if(e.detail.errMsg == 'getPhoneNumber:ok'){
            commonService.getPhone(e, (phone)=>{
                this.setData({phone: phone})
            })
        }
    },
    onNameInput: function(e){
        let value = e.detail.value
        this.setData({name: value})
    },
    onPhoneInput: function(e){
        let value = e.detail.value
        this.setData({phone: value})
    },
    onSubmit: function(){
        let appointment = {name: this.data.name, phone: this.data.phone, comment: this.data.comment,requirementTypeCode: this.data.requirementTypeCode,
            appointmentTimestamp: app.services.utilService.getDateTimeStr(this.data.date, this.data.time), agentName: this.data.agentName,agentPhone: this.data.agentPhone, houseUid: this.data.houseUid,
            houseTitle: this.data.houseTitle, houseCoverPicturePath: this.data.houseCoverPicturePath}
        this.setData({disabled: true})
        customizedAppointmentMutator.addAppointment(appointment)
            .subscribe((res)=>{
                wx.showToast({
                    title: "提交成功",
                    duration: 2000
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },2000)
            },()=>{
                this.setData({disabled: false})
            })
    },
    onCommentInput: function(e){
        this.data.comment = e.detail.value
    }
})