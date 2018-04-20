import { CustomizedAppointmentFinder } from '../../services/customized/finder/customized-appointment-finder'
import { CustomizedAppointmentMutator } from '../../services/customized/mutator/customized-appointment-mutator'

const app = getApp()

const customizedAppointmentFinder = new CustomizedAppointmentFinder()
const customizedAppointmentMutator = new CustomizedAppointmentMutator()

Page({
    data: {
    },
    onLoad: function(options) {

        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})

        wx.showLoading({
            title: '加载中',
        })

        customizedAppointmentFinder.getAllAppointmentDomain(app.services.constantService.CACHE_NONE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({appointments: res.data.list})
                }
            },null,()=>{
                wx.hideLoading()
            })

    },
    onCall: function(e){
        let phone = e.currentTarget.dataset.phone
        if(phone!=null){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
    onShow: function (options) {
        customizedAppointmentFinder.getAllAppointmentDomain(app.services.constantService.CACHE_NONE)
            .subscribe((res)=> {
                if (res.data != null && res.data.list != null) {
                    this.setData({appointments: res.data.list})
                }
            })
    },
    onDelete:function(e){
        let index = e.currentTarget.dataset.index
        if(index!=null){
            wx.showModal({
                content: '确定删除此预约?',
                success: (res)=> {
                    if (res.confirm) {
                        let appointment = this.data.appointments[index]
                        customizedAppointmentMutator.inactivateAppointmentDomain(appointment.userUid, appointment.appointmentUid)
                            .subscribe((res)=>{
                                this.setData({[`appointments[${index}].deleted`]: true})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }
                }
            })
        }
    },
    onClose:function(e){
        let index = e.currentTarget.dataset.index
        if(index!=null){
            wx.showModal({
                content: '确定关闭此预约?',
                success: (res)=> {
                    if (res.confirm) {
                        let appointment = this.data.appointments[index]
                        appointment.appointmentStatusCode = 'CLOSED'
                        customizedAppointmentMutator.modifyAppointmentDomain(appointment)
                            .subscribe((res)=>{
                                this.setData({[`appointments[${index}].appointmentStatusCode`]: 'CLOSED'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }
                }
            })
        }
    },
    onEdit: function(e){
        let index = e.currentTarget.dataset.index
        if(index!=null){
            app.services.cacheService.setStorage('NAV','dm-appointment',{appointment: this.data.appointments[index]} )
            wx.navigateTo({
                url: '/pages/dm-appointment/dm-appointment'
            })
        }
    }
})