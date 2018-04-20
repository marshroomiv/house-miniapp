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
        let loginUrl = webViewUrl + '#/frontend/mobile/login'
        let fullUrl = webViewUrl + '#/frontend/mobile/login;token=' + encodeURI(jwtToken)

        this.setData({loginUrl:loginUrl, fullUrl: fullUrl})
    },
    onCopyLoginUrl:function(e){
        wx.setClipboardData({
            data: this.data.loginUrl,
            success: function(res) {
                wx.showToast({
                    title: "复制成功"
                })
            }
        })
    },
    onCopyFullUrl: function(e){
        wx.setClipboardData({
            data: this.data.fullUrl,
            success: function(res) {
                wx.showToast({
                    title: "复制成功"
                })
            }
        })
    }
})