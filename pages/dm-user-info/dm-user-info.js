const app = getApp()

Page({
    data: {
    },
    onLoad: function(options) {
        let context = app.services.cacheService.getStorage('NAV','dm-user-info')
        if(context==null || context.userObject == null){
            app.services.utilService.toHomePage()
            return
        }
        this.setData({userObject: context.userObject})
    }
})