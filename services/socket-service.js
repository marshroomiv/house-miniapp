export class SocketService {

    socketTask = null
    socketMsgQueue = []

     sendSocketMessage(msg) {
        if (this.socketTask!=null) {
            this.socketTask.send({
                data : msg
            })
        } else {
            this.socketMsgQueue.push(msg)
        }
     }

    openSocket(){
        if(this.socketTask != null){
            return
        }

        const app = getApp()

        console.log('connectSocket')

        this.socketTask = wx.connectSocket({
            url: app.services.constantService.WSS_URL  + 'services/rs/websocketService'
        })

        this.socketTask.onError((res) => {
            console.log('onSocketError')

            this.socketTask.close({
                success: ()=>{
                    console.log('close success')
                },
                fail: ()=>{
                    console.log('close faile')
                }
            })
        })
        this.socketTask.onClose((res) => {
            console.log('onSocketClose')

            this.socketTask = null
            setTimeout(()=>{
                this.openSocket()
            }, 60000)
        })

        this.onSocketOpen()
        this.onSocketMessage()
    }

    subscribe(){
        const app = getApp()

        let msg = 'GET '+ app.services.constantService.WSS_SUB_URL +'\r\nAuthorization:' + app.services.cacheService.getStorage(null,'JWT_TOKEN')

        this.sendSocketMessage(msg)
    }

    parseResponse(response){
        let i = response.indexOf('{')
        if(i<0){
            return null
        }
        let j = response.lastIndexOf('}')
        if(j<0){
            return null
        }

        let content = response.substr(i, response.length - i)

        return JSON.parse(content)
    }

    onSocketOpen(){
        this.socketTask.onOpen((res)=> {
            console.log('onSocketOpen')

            this.subscribe()

            for (let i = 0; i < this.socketMsgQueue.length; i++){
                this.sendSocketMessage(this.socketMsgQueue[i])
            }
            this.socketMsgQueue = []

            const app = getApp()
            if(app.globalData.msgs.length == 0){
                let obj = {key: 'getAllUserMessageDomain', service:'customizedUserMessageFinder', method:'getAllUserMessageDomain',
                    parameters: {}}

                let request = 'POST ' + app.services.constantService.WSS_CALL_URL +
                    '\r\nContent-type: application/json' +
                    '\r\nAccept: application/json' +
                    '\r\nAuthorization: ' + app.services.cacheService.getStorage(null, 'JWT_TOKEN') +
                    '\r\n' +
                    '\r\n' + JSON.stringify(obj)

                this.sendSocketMessage(request)
            }
        })
    }

    checkExist(exist, newMsg){
        for(let i=exist.length-1;i>=0;i--){
            let item = exist[i]
            if(item.userMessageUid == newMsg.userMessageUid){
                return true
            }
            let itemCreateTimestamp = (new Date(item.createTimestamp)).getTime()
            let newMsgCreateTimestamp = (new Date(newMsg.createTimestamp)).getTime()

            if(itemCreateTimestamp < newMsgCreateTimestamp){
                return
            }
        }
        return false
    }
    deduplicate(list){
        const app = getApp()

        let newMsg = []
        for(let msg of list){
            if(!this.checkExist(app.globalData.msgs, msg)){
                newMsg.push(msg)
            }
        }
        return newMsg
    }

    newMsgCallBack = null
    splitMsgsByUser(msgs, isNew){
        const app = getApp()
        for(let msg of msgs){
            if( !(msg.msgType == 'text' || msg.msgType == 'image' || msg.msgType == 'reply-text' || msg.msgType == 'reply-image') ){
                continue
            }
            let userMsg = app.globalData.msgsByUser[msg.userUid]
            if(userMsg == null){
                if(msg.msgType == 'reply-text' || msg.msgType == 'reply-image'){
                    continue
                }
                userMsg = {}
                app.globalData.msgsByUser[msg.userUid] = userMsg
                userMsg.userUid = msg.userUid
                userMsg.nickName = msg.nickName
                userMsg.headImageUrl = msg.headImageUrl
                userMsg.newMsgCount = 0
                userMsg.msgs = []
            }
            userMsg.createTimestamp = (new Date(msg.createTimestamp)).getTime()
            userMsg.msgs.push(msg)
            if(msg.msgType == 'image' || msg.msgType == 'reply-image'){
                userMsg.content = '[图片]'
            }else{
                userMsg.content = msg.content
            }
            if(isNew){
                userMsg.newMsgCount ++
            }
        }
        app.globalData.msgsByUserArr = []
        for(let key in app.globalData.msgsByUser){
            app.globalData.msgsByUserArr.push(app.globalData.msgsByUser[key])
        }

        app.globalData.msgsByUserArr.sort((a,b)=>{
            if(a.createTimestamp > b.createTimestamp){
                return -1
            }else{
                return 1
            }
        })

        if(this.newMsgCallBack!=null){
            this.newMsgCallBack()
        }
    }
    onSocketMessage(){
        this.socketTask.onMessage((res)=> {
            const app = getApp()

            res.data = this.parseResponse(res.data)

            if(res.data==null){
                return
            }

            if(res.data.messages!=null){//如果有报错，直接就是Response而不是WebsocketResponse
                if(!app.services.utilService.checkMessage(res.data.messages)){
                    return
                }
            }else if(res.data.message == null){
                if(!app.services.utilService.checkMessage(res.data.response.messages)){
                    return
                }
            }

            if(res.data.key == 'customerMessage'){

                /*let webViewUrl = app.services.cacheService.getStorage(null, 'WEB_VIEW_URL')
                wx.playBackgroundAudio({
                    dataUrl: webViewUrl + 'assets/new-msg.mp3',
                })*/

                app.services.utilService.vibrate(3)

                app.globalData.newMsgCount ++

                let createTimestamp = app.services.cacheService.getStorage(null, 'MSG_TIME')
                let obj = {key: 'getLatestUserMessageDomain', service:'customizedUserMessageFinder', method:'getLatestUserMessageDomain',
                    parameters: {createTimestamp: createTimestamp==null?null: Number(createTimestamp)}}

                let request = 'POST ' + app.services.constantService.WSS_CALL_URL +
                    '\r\nContent-type: application/json' +
                    '\r\nAccept: application/json' +
                    '\r\nAuthorization: ' + app.services.cacheService.getStorage(null, 'JWT_TOKEN') +
                    '\r\n' +
                    '\r\n' + JSON.stringify(obj)

                this.sendSocketMessage(request)

            }else if(res.data.key == 'getAllUserMessageDomain'){
                if(res.data.response.list != null && res.data.response.list.length >0){
                    app.services.cacheService.setStorage(null, 'MSG_TIME', (new Date(res.data.response.list[0].createTimestamp)).getTime())
                    app.globalData.msgs.push(...(res.data.response.list.reverse()))
                    this.splitMsgsByUser(app.globalData.msgs, false)
                }else{
                    app.services.cacheService.setStorage(null, 'MSG_TIME', (new Date()).getTime())
                }
            }
            else if(res.data.key == 'getLatestUserMessageDomain'){
                if(res.data.response.list != null && res.data.response.list.length >0){
                    app.services.cacheService.setStorage(null, 'MSG_TIME', (new Date(res.data.response.list[0].createTimestamp)).getTime())

                    let msgs = (this.deduplicate(res.data.response.list))
                    if(msgs.length > 0){
                        msgs.reverse()
                        app.globalData.msgs.push(...msgs)

                        this.splitMsgsByUser(msgs, true)
                    }
                }
            }else if(res.data.key == 'sendKefuMsg'){

                if(res.data.response.value != null){
                    app.globalData.msgs.push(res.data.response.value)
                    this.splitMsgsByUser([res.data.response.value], true)
                }
            }
        })
    }


    constructor(){
    }

}