import { CustomizedAppointmentFinder } from '../../services/customized/finder/customized-appointment-finder'

const app = getApp()

const customizedAppointmentFinder = new CustomizedAppointmentFinder()

Page({
    data: {
    },
    onLoad: function(options) {

        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})

        wx.showLoading({
            title: '加载中',
        })
        customizedAppointmentFinder.getAllAppointment(app.services.constantService.CACHE_NONE)
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
    }
})