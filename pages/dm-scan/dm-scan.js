import { WebsocketService } from '../../services/customized/websocket-service'

const app = getApp()

const websocketService = new WebsocketService()

Page({
    data: {
        disabled: false
    },
    onLoad: function (options) {
        let qrContent = options.qrContent

        if(qrContent == null){
            app.services.utilService.toHomePage()
            return
        }

        //app.services.utilService.showModal(qrContent)

        let arr = qrContent.split(',')

        if(arr.length == 2){
            this.setData({type: arr[0], uid: arr[1]})
        }else{
            this.setData({type: arr[0], userUid: arr[1], uid: arr[2]})
        }
    },
    onBack: function(e){
        wx.navigateBack()
    },
    onLogin: function(e){
        this.setData({disabled: true})
        websocketService.login(this.data.uid)
            .subscribe((res)=>{
                wx.showToast({
                    title: "登录成功",
                    duration: 2000
                })
            })
    }
})