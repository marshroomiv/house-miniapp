const app = getApp()

Page({
    data: {
    },
    onLoad: function(options) {

        let jwtToken = app.services.cacheService.getStorage(null, 'JWT_TOKEN')

        if(jwtToken==null) {
            app.services.utilService.toHomePage()
            return
        }

        let webViewUrl = app.services.cacheService.getStorage(null, 'WEB_VIEW_URL')
        jwtToken = jwtToken.substr(4, jwtToken.length - 4)
        let url = webViewUrl + '#/frontend/mobile/login;token=' + encodeURI(jwtToken)+';from=webview'

        if(options.dest!=null){
            url = url + ';dest=' + options.dest
        }

        this.setData({url: url})
    }
})