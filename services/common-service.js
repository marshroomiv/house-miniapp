import { CustomizedUserShareMutator } from './customized/mutator/customized-user-share-mutator'
import { CustomizedUserMutator } from './customized/mutator/customized-user-mutator'
import { WeixinMiniAppService } from './customized/weixin-mini-app-service'

const app = getApp()

export class CommonService{

    addShare(sharerUid){
        let customizedUserShareMutator = new CustomizedUserShareMutator()
        let interval = setInterval(()=>{
            let JWT_TOKEN = app.services.cacheService.getStorage(null,'JWT_TOKEN')
            if(JWT_TOKEN!=null){
                clearInterval(interval)

                let user = app.services.cacheService.getStorage(null, 'USER')
                if(user.userUid != sharerUid){//avoid share to self
                    customizedUserShareMutator.addUserShare(sharerUid)
                        .subscribe((res)=>{
                            console.log('addShare')
                            console.log(res)
                        })
                }
            }
        },10000);
    }

    getUser(scope, callBack){
        let user = app.services.cacheService.getStorage(null,'USER')
        if(user!=null){
            scope.setData({user: user})
            if(callBack!=null){
                callBack(user)
            }
            return
        }
        let interval = setInterval(()=>{
            let user = app.services.cacheService.getStorage(null,'USER')
            if(user!=null){
                clearInterval(interval)
                scope.setData({user: user})
                if(callBack!=null){
                    callBack(user)
                }
            }
        },1000);
    }

    getDomain(scope, callBack){
        let domain = app.services.cacheService.getStorage(null,'DOMAIN')
        if(domain!=null){
            scope.setData({domain: domain})
            if(callBack!=null){
                callBack(domain)
            }
            return
        }
        let interval = setInterval(()=>{
            let domain = app.services.cacheService.getStorage(null,'DOMAIN')
            if(domain!=null){
                clearInterval(interval)
                scope.setData({domain: domain})
                if(callBack!=null){
                    callBack(domain)
                }
            }
        },1000);
    }

    onShareFail(res){
        if(res.errMsg != 'shareAppMessage:fail cancel'){
            let content = app.services.utilService.getErrorMsg(res.errMsg)
            wx.showModal({
                content: content,
                showCancel: false,
                confirmText: "确定",
            })
        }
    }

    onShareCms(cmsCmsItems){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/cms/cms?cmsUid=' + cmsCmsItems.cms.cmsUid + '&sharerUid='+user.userUid

        return {
            title: cmsCmsItems.cms.title,
            path: path,
            //imageUrl: app.services.constantService.FILE_URL + cmsCmsItems.cms.thumbUrlPath,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }
    }

    onShareSellHouse(houseUid, houseTitle){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/detail/detail?houseUid=' + houseUid + '&sharerUid='+user.userUid

        return {
            title: houseTitle,
            path: path,
            //imageUrl: app.services.constantService.FILE_URL + cmsCmsItems.cms.thumbUrlPath,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }
    }

    onShareRentHouse(houseUid,houseTitle){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/rent-detail/rent-detail?houseUid=' + houseUid + '&sharerUid='+user.userUid

        return {
            title: houseTitle,
            path: path,
            //imageUrl: app.services.constantService.FILE_URL + cmsCmsItems.cms.thumbUrlPath,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }
    }

    onShareShop(){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/shop/shop?sharerUid='+user.userUid
        let domain = app.services.cacheService.getStorage(null,'DOMAIN')

        return {
            title: domain.domainDescription,
            path: path,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }
    }
    
    onShareIndex(){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/index/index?sharerUid='+user.userUid
        let domain = app.services.cacheService.getStorage(null,'DOMAIN')
        let domainPosterPath = (domain.domainPosterPath == null || domain.domainPosterPath == ''?null: app.services.constantService.FILE_URL + app.services.utilService.getThumbnailUrl(domain.domainPosterPath,'_750_0' ))

        let ret = {
            title: domain.domainDescription,
            path: path,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }

        if(domainPosterPath != null){
            ret. imageUrl= domainPosterPath
        }
        return ret
    }

    getUserInfoOK(callBack){
        wx.getUserInfo({
            lang: 'zh_CN',
            success: (res)=> {
                let userInfo = res.userInfo
                let customizedUserMutator = new CustomizedUserMutator()
                let user = {nickName: userInfo.nickName, sex: userInfo.gender.toString(), language:userInfo.language, city:userInfo.city, province:userInfo.province, country:userInfo.country, headImageUrl: userInfo.avatarUrl}

                customizedUserMutator.modifyUser(user)
                    .subscribe((res)=>{
                        app.services.cacheService.setStorage(null,'USER_INFO','Y')
                        app.services.cacheService.setStorage(null,'USER',res.data.value)
                        if(callBack!=null){
                            callBack(user)
                        }
                    })
            }
        })
    }

    getUserInfo(callBack, failCallBack){
        let userInfo = app.services.cacheService.getStorage(null,'USER_INFO')
        if(userInfo!=null){
            if(callBack!=null){
                callBack(app.services.cacheService.getStorage(null,'USER'))
            }
            return
        }
        wx.getSetting({
            success: (res)=> {
                if (res.authSetting['scope.userInfo']==null) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success:()=> {
                            this.getUserInfoOK(callBack)
                        },
                        fail:()=>{
                            if(failCallBack!=null){
                                failCallBack()
                            }
                        }
                    })
                }else if(res.authSetting['scope.userInfo']){
                    this.getUserInfoOK(callBack)
                }else{
                    wx.openSetting({
                        success: (res) => {
                            if(res.authSetting['scope.userInfo']){
                                this.getUserInfoOK(callBack)
                            }else{
                                if(failCallBack!=null){
                                    failCallBack()
                                }
                            }
                        }
                    })
                }
            }
        })
    }


    getAddressOK(callBack){
        wx.chooseAddress({
            success: (res)=> {
                let orderCustomerContact = {provinceName: res.provinceName ,cityName: res.cityName,districtName: res.countyName,addressDetail: res.detailInfo,postalCode:res.postalCode,name:res.userName,phone: res.telNumber};

                if(callBack!=null){
                    callBack(orderCustomerContact)
                }
            }
        })
    }

    getAddress(callBack){
        wx.getSetting({
            success: (res)=> {
                if (res.authSetting['scope.address']==null) {
                    wx.authorize({
                        scope: 'scope.address',
                        success:()=> {
                            this.getAddressOK(callBack)
                        }
                    })
                }else if(res.authSetting['scope.address']){
                    this.getAddressOK(callBack)
                }else{
                    wx.openSetting({
                        success: (res) => {
                            if(res.authSetting['scope.address']){
                                this.getAddressOK(callBack)
                            }
                        }
                    })
                }
            }
        })
    }

    getPhone(e, callBack){
        let phone = app.services.cacheService.getStorage(null,'PHONE')
        if(phone!=null){
            if(callBack!=null){
                callBack(phone)
            }
            return
        }

        const weixinMiniAppService = new WeixinMiniAppService()
        weixinMiniAppService.decrypt('phone', e.detail.encryptedData, e.detail.iv)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    let value = res.data.value
                    console.log('parse result')
                    console.log(JSON.stringify(value))
                    app.services.cacheService.setStorage(null,'PHONE',value.phone )
                    if(callBack!=null){
                        callBack(value.phone)
                    }
                }
            })

    }

    saveImageToPhotosAlbumOK(url){
        wx.downloadFile({
            url: url,
            success: (res)=>{
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success:(res)=> {
                            wx.showToast({
                                title: "保存成功"
                            })
                        }
                    })
                }
            }
        })
    }
    saveImageToPhotosAlbum(url){
        wx.getSetting({
            success: (res)=> {
                if (res.authSetting['scope.writePhotosAlbum']==null) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success:()=> {
                            this.saveImageToPhotosAlbumOK(url)
                        }
                    })
                }else if(res.authSetting['scope.writePhotosAlbum']){
                    this.saveImageToPhotosAlbumOK(url)
                }else{
                    wx.openSetting({
                        success: (res) => {
                            if(res.authSetting['scope.writePhotosAlbum']){
                                this.saveImageToPhotosAlbumOK(url)
                            }
                        }
                    })
                }
            }
        })
    }

}