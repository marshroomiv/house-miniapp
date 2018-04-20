export class UtilService{

    constructor(constantService, cacheService){
        this.constantService = constantService
        this.cacheService = cacheService
    }

    joinUrl(url, params){
        if(url == null || url == ''){
            return null
        }
        if(params == null){
            return url
        }
        let query
        for(let key in params){
            if(params[key] == null){
                continue
            }
            if(query == null){
                query = key + '=' + encodeURI(params[key])
            }else{
                query = query + '&' + key + '=' + encodeURI(params[key])
            }
        }
        if(query == null){
            return url
        }else{
            return url + '?' + query
        }
    }

    joinUrl1(url, params){
        if(url == null || url == ''){
            return null
        }
        if(params == null){
            return url
        }
        let query
        for(let key in params){
            if(params[key] == null){
                continue
            }
            if(query == null){
                query = encodeURI(params[key])
            }else{
                query = query + '/'  + encodeURI(params[key])
            }
        }
        if(query == null){
            return url
        }else{
            return url + '/' + query
        }
    }

    sortAsc(a,b) {
        if (a.sequenceNr > b.sequenceNr) {
            return 1
        } else {
            return -1
        }
    }

    sortDesc(a,b) {
        if (a.sequenceNr > b.sequenceNr) {
            return -1
        } else {
            return 1
        }
    }

    sortCreateTimeAsc(a,b) {
        if (a.createTimestamp > b.createTimestamp) {
            return 1
        } else {
            return -1
        }
    }

    sortCreateTimeDesc(a,b) {
        if (a.createTimestamp > b.createTimestamp) {
            return -1
        } else {
            return 1
        }
    }

    mapSlideShowPicture(slideShowObject){
        if(slideShowObject==null || slideShowObject.slideShowItemObjectList==null || slideShowObject.slideShowItemObjectList.length==0){
            return null
        }
        slideShowObject.slideShowItemObjectList.sort(this.sortAsc)
        let arr = []
        for(let item of slideShowObject.slideShowItemObjectList){
            arr.push({img:item.slideShowItemPosterPath,url:item.slideShowItemUrl,video:item.slideShowItemVideoPath})
        }
        return arr
    }

    clone(input){
        if(input==null){
            return null
        }
        return JSON.parse(JSON.stringify(input))
    }

    getThumbnailUrl(url, thumbnailSuffix) {
        if(thumbnailSuffix == null){
            return url
        }
        let extension = url.substr(url.length-4, 4)
        if(extension == '.gif'){ //url have no thumbnail
            return url
        }
        let part1 = url.slice(0, url.length - 4)
        let part2 = url.slice(url.length - 4, url.length)
        return part1 + thumbnailSuffix + part2
    }

    containRole(array, obj){
        if(array == null || array.length==0){
            return false
        }
        for(let item of array){
            if(item.roleName == obj){
                return true
            }
        }

        return false
    }
    login(){
        wx.login({
            success: (res)=> {
                if(res == null || res.code==null){
                    wx.showModal({
                        content: res.errMsg,
                        showCancel: false,
                        confirmText: "确定",
                    })
                }else {
                    wx.request({
                        url: this.joinUrl(
                            this.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'weixinMiniAppPublicService/login',
                            //'https://saas.zhaowu.cc/zhaowu-service/services/customized/public/rs/weixinMiniAppPublicService/login',
                            {domainUid: this.constantService.DOMAIN_UID, domainWmaUid: this.constantService.WMA_UID, code: res.code}),
                        header: { 'Accept': 'application/json' },
                        success: (res)=> {
                            if(res.data.messages.errors.length == 0){
                                this.cacheService.setStorage(null, 'JWT_TOKEN', 'JWT ' + res.data.value.jwtToken)
                                this.cacheService.setStorage(null, 'ROLES', res.data.value.roles)
                                this.cacheService.setStorage(null, 'USER', res.data.value.user)
                                this.cacheService.setStorage(null, 'DOMAIN', res.data.value.domain)
                                this.cacheService.setStorage(null, 'DICTIONARIES', res.data.value.dictionaries)
                                this.cacheService.setStorage(null, 'DOMAIN_WPP_UID', res.data.value.domainWppUid);
                                this.cacheService.setStorage(null, 'WEB_VIEW_URL', res.data.value.webViewUrl);
                                this.cacheService.setStorage(null, 'COMMERCIAL_INTEREST_RATE', res.data.value.commercialInterestRate)
                                this.cacheService.setStorage(null, 'ACCUMULATION_FUND_INTEREST_RATE', res.data.value.accumulationFundInterestRate);

                                if(this.containRole(res.data.value.roles, 'DOMAIN_ADMIN_ROLE')){
                                    const app = getApp()
                                    app.services.socketService.openSocket()
                                }
                            }else{
                                this.showModal(res.data.messages.errors[0].description)
                            }
                        }
                    })
                }
            }
        });
    }

    toHomePage(){
        wx.reLaunch({
            url: '/pages/index/index'
        })
    }

    showModal(msg){
        wx.showModal({
            content: msg,
            showCancel: false,
            confirmText: "确定",
        })
    }

    checkMessage(messages){
        if(messages==null || messages.errors==null || messages.errors.length==0){
            return true
        }

        if(messages.errors[0].code=='token.Invalid'){
            const app = getApp()
            app.services.cacheService.removeStorage(null,'JWT_TOKEN')
        }

        wx.showModal({
            content: messages.errors[0].description,
            showCancel: false,
            confirmText: "确定",
        })
        return false
    }

    checkResponse(res){
        if(res.data==null || res.data.messages == null){
            wx.showModal({
                content: "服务器返回信息有误",
                showCancel: false,
                confirmText: "确定",
            })
            return false
        }else if(res.data.messages.errors.length==0){
            return true
        }else{
            if(res.data.messages.errors[0].code=='token.Invalid'){
                const app = getApp()
                app.services.cacheService.removeStorage(null,'JWT_TOKEN')
            }
            wx.showModal({
                content: res.data.messages.errors[0].description,
                showCancel: false,
                confirmText: "确定",
            })
            return false
        }
    }

    getErrorMsg(input){
        let index = input.indexOf('(')
        if(index>0){
            return input.substr(index+1, input.length - index -2)
        }
    }

    getImgUrls(orderObject){
        let imgUrls = []
        for(let i=0;i<orderObject.orderItemObjectList.length && i<4; i++){
            let item = orderObject.orderItemObjectList[i]
            imgUrls.push(item.productCoverPicturePath)
        }
        return imgUrls
    }

    getDate(date){
        let month
        if(date.getMonth()<9){
            month = '0'+ (date.getMonth() + 1);
        }else{
            month = '' + (date.getMonth() + 1);
        }
        let dateStr
        if(date.getDate() < 10){
            dateStr = '0' + date.getDate()
        }else{
            dateStr = '' + date.getDate()
        }

        return date.getFullYear() + '-'+ month + '-' + dateStr
    }

    getTime(date){
        let hour
        if(date.getHours()<10){
            hour = '0' + date.getHours()
        }else{
            hour = '' + date.getHours()
        }

        let minute
        if(date.getMinutes()<10){
            minute = '0' + date.getMinutes()
        }else{
            minute = '' + date.getMinutes()
        }

        return hour + ':' + minute
    }

    getDateTimeStr(date, time){
        if(date == null){
            return null
        }
        let str = date
        if(time == null){
            str= str + 'T00:00:00.000+08:00'
        }else{
            str= str + 'T' + time + ':00.000+08:00'
        }
        return str
    }

    getFileName(fullPath){
        let index = fullPath.lastIndexOf('/')
        if(index < 0){
            return ''
        }
        return fullPath.substr(index + 1, fullPath.length - index - 1)
    }

    getExtension(fileName){
        let index = fileName.lastIndexOf('.')
        if(index < 0){
            return ''
        }
        return fileName.substr(index+1, fileName.length - index - 1)
    }

    getCommunity(communityUid, communityObjects){
        if(communityUid!=null && communityObjects!=null && communityObjects.length>0){
            for(let item of communityObjects){
                if(item.communityUid == communityUid){
                    return item
                }
            }
        }
    }

    getBlock(blockUid, blocks){
        if(blockUid!=null && blocks!=null && blocks.length>0){
            for(let item of blocks){
                if(item.blockUid == blockUid){
                    return item
                }
            }
        }
    }

    vibrate(count){
        let i=0
        let interval = setInterval(()=>{
            wx.vibrateLong()
            i ++
            if(i>=count){
                clearInterval(interval)
            }
        },1000)
    }

    wxParseTagATap(href){
        if(href!=null && href.startsWith('/pages')){
            if(href.startsWith('/pages/index/index') || href.startsWith('/pages/buy/buy') || href.startsWith('/pages/rent/rent') || href.startsWith('/pages/shop/shop') || href.startsWith('/pages/my/my')){
                wx.switchTab({
                    url: href
                })
            }else{
                wx.navigateTo({
                    url: href
                })
            }
        }
    }

    toHttps(url){
        return url.substr(0,4) + 's' + url.substr(4,url.length - 4)
    }
}