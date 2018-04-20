const app = getApp()

Page({
    data: {
    },
    onLoad: function(options) {
        let user = app.services.cacheService.getStorage(null, 'USER')
        this.setData({user: user})
    }
})