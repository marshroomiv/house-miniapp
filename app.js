import { ConstantService } from './services/constant-service'
import { CacheService } from './services/cache-service'
import { UtilService } from './services/util-service'
import { SocketService } from './services/socket-service'

let constantService = new ConstantService()
let cacheService = new CacheService(constantService)
let socketService = new SocketService()
let utilService = new UtilService(constantService, cacheService)


let login = function(){
    wx.checkSession({
        success: function(){
            if(cacheService.getStorage(null,'JWT_TOKEN')==null){
                utilService.login()
            }else if(((new Date()).getTime() - cacheService.getStorageTime(null,'JWT_TOKEN')) > 43200000){ //超出12小时，只要有隐藏显示就强制登录
                utilService.login()
            }else {
                if(utilService.containRole(cacheService.getStorage(null,'ROLES'), 'DOMAIN_ADMIN_ROLE')){
                    socketService.openSocket()
                }
            }
        },
        fail: function(){
            utilService.login()
        }
    })
}

App({
    onLaunch: function () {
        cacheService.initStorage()
        let systemInfo = wx.getSystemInfoSync()
        if(systemInfo.SDKVersion < '1.9.0'){
            wx.showModal({
                content: '微信版本过低,请升级后使用',
                showCancel: false,
                confirmText: "确定",
            })
        }
    },
    onShow: function () {
        console.log('App Show')
        login()
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        showRedPack: true,
        showCoupon: true,
        newMsgCount: 0,
        msgs: [],
        msgsByUser: {},
        msgsByUserArr: []
    },
    services: {
        constantService: constantService,
        cacheService: cacheService,
        utilService: utilService,
        socketService: socketService
    }
});