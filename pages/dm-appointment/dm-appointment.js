import { CustomizedAppointmentMutator } from '../../services/customized/mutator/customized-appointment-mutator'

const app = getApp()

const customizedAppointmentMutator = new CustomizedAppointmentMutator()

Page({
    data: {
    },
    onLoad: function(options) {

        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})

        let context = app.services.cacheService.getStorage('NAV','dm-appointment')
        if(context==null || context.appointment == null){
            app.services.utilService.toHomePage()
            return
        }
        this.setData({appointment: context.appointment})

        let minDate = new Date()
        let maxDate = new Date()

        maxDate.setDate(maxDate.getDate() + 10)

        let appointmentTimestamp = new Date(context.appointment.appointmentTimestamp)
        let date = app.services.utilService.getDate(appointmentTimestamp)
        let time = app.services.utilService.getTime(appointmentTimestamp)

        this.setData({date: date, time: time, minDate: app.services.utilService.getDate(minDate), maxDate: app.services.utilService.getDate(maxDate)})
    },
    onDateChange:function(e){
        this.setData({date: e.detail.value})
    },
    onTimeChange:function(e){
        this.setData({time: e.detail.value})
    },
    onAgentNameInput: function(e){
        let value = e.detail.value
        this.setData({'appointment.agentName': value})
    },
    onAgentPhoneInput: function(e){
        let value = e.detail.value
        this.setData({'appointment.agentPhone': value})
    },
    onSubmit: function(){
        let appointment = this.data.appointment

        appointment.appointmentTimestamp = app.services.utilService.getDateTimeStr(this.data.date, this.data.time)

        this.setData({disabled: true})
        customizedAppointmentMutator.modifyAppointmentDomain(appointment)
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
    }
})