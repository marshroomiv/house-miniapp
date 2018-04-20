const app = getApp()

Page({
    data: {
    },
    onLoad: function(options) {

    },
    onShow: function() {
        this.setData({msgsByUserArr: app.globalData.msgsByUserArr})
        app.services.socketService.newMsgCallBack = ()=>{
            this.setData({msgsByUserArr: app.globalData.msgsByUserArr})
        }
    },
    onHide: function() {
        app.globalData.newMsgCount = 0
        app.services.socketService.newMsgCallBack = null
    },
    onUnload: function() {
        this.onHide()
    },
    onTap: function(e) {
        wx.navigateTo({
            url: app.services.utilService.joinUrl('/pages/dm-chat-window/dm-chat-window',{'userUid': e.currentTarget.dataset.useruid})
        })
    }
})