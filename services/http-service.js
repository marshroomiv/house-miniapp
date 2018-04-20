const app = getApp()

export class HttpService{

    constructor(url, data, header, method, dataType, callBack){

        this.url = url
        this.data = data
        this.header = header
        this.method = method
        this.dataType = dataType
        this.callBack = callBack
    }

    setCache(localCacheIndicator, subject, key, ttl){

        this.localCacheIndicator = localCacheIndicator
        this.subject = subject
        this.key = key
        this.ttl = ttl

    }

    assembleRequest(url, data, header, method, dataType, success, fail, complete){
        let request = {}
        request.url = url

        if(data != null){
            request.data = data
        }
        if(header != null){
            request.header = header
        }
        if(method != null){
            request.method = method
        }
        if(dataType != null){
            request.dataType = dataType
        }
        if(success != null){
            request.success = success
        }
        if(fail != null){
            request.fail = fail
        }
        if(complete != null){
            request.complete = complete
        }
        return request
    }

    subscribe(success, fail, complete){

          let networkFail = (res)=>{
                wx.showModal({
                    content: "网络连接失败",
                    //content: JSON.stringify(res),
                    showCancel: false,
                    confirmText: "确定",
                })
                console.log(res)
            }


        if(this.localCacheIndicator == null || this.localCacheIndicator == app.services.constantService.CACHE_NONE){

            wx.request(this.assembleRequest(this.url, this.data, this.header, this.method, this.dataType,
                (res)=>{
                    if(app.services.utilService.checkResponse(res)){
                        if(success != null){
                            success(res)
                        }
                        if(this.callBack!=null){
                            this.callBack()
                        }
                    }else if(fail!=null){
                        fail()
                    }
                },
                networkFail, complete))

            return

        }

        if(app.services.constantService.CACHE_READ_WRITE == this.localCacheIndicator){
            let value = app.services.cacheService.getStorage(this.subject, this.key, this.ttl)
            if( value != null ){
                success(value)
                if(complete!=null){
                    complete(value)
                }
                return
            }
        }

        wx.request(this.assembleRequest(this.url, this.data, this.header, this.method, this.dataType,
            (res)=>{

                if(app.services.utilService.checkResponse(res)){
                    if(app.services.constantService.CACHE_WRITE == this.localCacheIndicator || app.services.constantService.CACHE_READ_WRITE == this.localCacheIndicator){
                        app.services.cacheService.setStorage(this.subject, this.key, res)
                    }

                    if(success != null){
                        success(res)
                    }
                    if(this.callBack!=null){
                        this.callBack()
                    }
                }else if(fail!=null){
                    fail()
                }

            },
            networkFail, complete))

    }
}