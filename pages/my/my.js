import { CommonService } from '../../services/common-service'
import { UserWebservice } from '../../services/customized/user-web-service'
const app = getApp()

const commonService = new CommonService()
const userWebservice = new UserWebservice()

Page({
    data: {
    },
    onLoad: function(options) {
        commonService.getUserInfo((user)=>{
            this.setData({user: user})
        },()=>{
            app.services.utilService.toHomePage()
        })

        let domainWppUid = app.services.cacheService.getStorage(null, 'DOMAIN_WPP_UID')
        this.setData({domainWppUid: domainWppUid})

        let roles = app.services.cacheService.getStorage(null, 'ROLES')
        if(roles!=null){
            for(let item of roles){
                if(item.roleName == 'DOMAIN_ADMIN_ROLE'){
                    this.setData({isDomainAdmin: true})
                }
            }
        }

        this.setData({domain: app.services.cacheService.getStorage(null, 'DOMAIN')})

    },
    onShow: function() {
        this.setData({newMsgCount: app.globalData.newMsgCount})
    },
    onShareTap: function(e){
        wx.navigateTo({
            url: '/pages/share/share'
        })
    },
    onWmaCodeTap: function(e){
        wx.navigateTo({
            url: '/pages/wmacode/wmacode'
        })
    },
    onQrCodeTap: function(e){
        wx.navigateTo({
            url: '/pages/qrcode/qrcode'
        })
    },
    onClearCache: function(e){
        app.services.cacheService.initStorage()
        wx.showToast({
            title: "清除成功"
        })
        userWebservice.getLoginInfo()
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    app.services.cacheService.setStorage(null, 'ROLES', res.data.value.roles)
                    app.services.cacheService.setStorage(null, 'USER', res.data.value.user)
                    app.services.cacheService.setStorage(null, 'DOMAIN', res.data.value.domain)
                    app.services.cacheService.setStorage(null, 'DICTIONARIES', res.data.value.dictionaries)
                    app.services.cacheService.setStorage(null, 'DOMAIN_WPP_UID', res.data.value.domainWppUid);
                    app.services.cacheService.setStorage(null, 'WEB_VIEW_URL', res.data.value.webViewUrl);
                    
                    app.services.cacheService.setStorage(null, 'COMMERCIAL_INTEREST_RATE', res.data.value.commercialInterestRate)
                    app.services.cacheService.setStorage(null, 'ACCUMULATION_FUND_INTEREST_RATE', res.data.value.accumulationFundInterestRate);

                    if(app.services.utilService.containRole(res.data.value.roles, 'DOMAIN_ADMIN_ROLE')){
                        app.services.socketService.openSocket()
                    }
                }

                setTimeout(()=>{
                    wx.reLaunch({
                        url: '/pages/my/my'
                    })
                },1000)
            })
    },
    onFocus: function(e){
        wx.navigateTo({
            url: '/pages/focus/focus'
        })
    },
    onCollect: function(e){
        wx.navigateTo({
            url: '/pages/favourite/favourite'
        })
    },
    onDmAppointment: function(e){
        wx.navigateTo({
            url: '/pages/dm-appointment/dm-appointment'
        })
    },
    onDmChat: function(e){
        wx.navigateTo({
            url: '/pages/dm-chat/dm-chat'
        })
    },
    onDmMember: function(e){
        wx.navigateTo({
            url: '/pages/dm-member/dm-member'
        })
    },
    onWeb: function(e){
        let domainWppUid = app.services.cacheService.getStorage(null, 'DOMAIN_WPP_UID')
        if(domainWppUid==null){
            wx.navigateTo({
                url: '/pages/dm-web/dm-web'
            })
        }else{
            wx.reLaunch({
                url: '/pages/dm-web/dm-web'
            })
        }
    },
    onVideo: function(e){
        wx.navigateTo({
            url: '/pages/dm-video/dm-video'
        })
    },
    onImage: function(e){
        wx.navigateTo({
            url: '/pages/dm-image/dm-image'
        })
    },
    onUserInfo: function(e){
        wx.navigateTo({
            url: '/pages/user-info/user-info'
        })
    },
    onAppointment: function(e){
        wx.navigateTo({
            url: '/pages/appointment-list/appointment-list'
        })
    },
    onDmAppointmentList: function(e){
        wx.navigateTo({
            url: '/pages/dm-appointment-list/dm-appointment-list'
        })
    },
    onMyHouse: function(e){
        wx.reLaunch({
            url: '/pages/dm-web/dm-web?dest=customer-data'
        })
    },
    onBackend: function(e){
        wx.navigateTo({
            url: '/pages/dm-backend/dm-backend'
        })
    },
    onDomainScan: function(e){
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                wx.navigateTo({
                    url: '/pages/dm-scan/dm-scan?qrContent=' + res.result
                })
            }
        })
    }
})