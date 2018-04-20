export class CacheService{

    constructor(constantService){
        this.constantService = constantService
    }

    isValid(ttl, timestamp){
        if ( ttl == null || ttl == 0 ) {
            ttl = this.constantService.DEFAULT_CACHE_TTL
        }

        let now = (new Date()).getTime()
        if( (now - timestamp) < ttl * 60000){
            return true
        }else{
            return false
        }
    }

    initStorage(){ //for login only
        try {
            let res = wx.getStorageInfoSync()
            if(res.keys != null){
                for(let key of res.keys){
                    if(!(key.indexOf('-') == 0)){
                        wx.removeStorageSync(key)
                    }
                }
            }
        } catch(e) {
            console.log(e.message)
        }
    }

    reduceStorage(){
        try {
            let res = wx.getStorageInfoSync()
            if(res.keys != null){
                for(let key of res.keys){
                    if(!(key.indexOf('-') == 0 || key.indexOf('NAV-')==0 )){
                        wx.removeStorageSync(key)
                    }
                }
            }
        } catch(e) {
            console.log(e.message)
        }
    }

    setStorage(subject, key, value){

        if(key == null || key == '' || value == null){
            return
        }

        if(subject == null){
            subject = ''
        }

        const now = (new Date()).getTime();

        try {
            wx.setStorageSync(subject + '-' + key , {value: value, timestamp: now})
        } catch (e) {
            console.log(e.message)
            this.reduceStorage() //clear storage except jwt & other important cache
        }
    }



    getStorage(subject, key, ttl){

        if(key == null || key == ''){
            return
        }

        if(subject == null || subject == ''){
            subject = ''
            ttl = this.constantService.LONG_CACHE_TTL
        }

        try {
            key  = subject + '-' + key
            let object = wx.getStorageSync(key)
            if (object != null && object!='') {
                if(this.isValid(ttl, object.timestamp)){
                    console.log('found cache')
                    return object.value
                }
            }
        } catch (e) {
            console.log(e.message)
        }
        return null
    }

    getStorageTime(subject, key){

        if(key == null || key == ''){
            return 0
        }

        if(subject == null || subject == ''){
            subject = ''
        }

        try {
            key  = subject + '-' + key
            let object = wx.getStorageSync(key)
            return object.timestamp
        } catch (e) {
            console.log(e.message)
        }
        return 0
    }


    removeStorage(subject, key){
        if(key == null || key == ''){
            return
        }

        if(subject == null || subject == ''){
            subject = ''
        }
        try {
            key  = subject + '-' + key
            wx.removeStorageSync(key)
        } catch (e) {
            console.log(e.message)
        }
    }

    clearSubject(subjects){
        try {
            for(let i=0;i<subjects.length;i++){
                subjects[i] = subjects[i] + '-'
            }
            let res = wx.getStorageInfoSync()
            if(res.keys != null){
                for(let key of res.keys){
                   for(let subject of subjects){
                       if(key.indexOf(subject) == 0){
                           wx.removeStorageSync(key)
                           break
                       }
                   }
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    clearStorage(){
        try {
            wx.clearStorageSync()
        } catch(e) {
            console.log(e.message)
        }
    }
}