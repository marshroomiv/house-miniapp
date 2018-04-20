import { HttpService } from '../http-service'

const app = getApp()

export class WeixinMiniAppService{

    getWmaCodePath(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'weixinMiniAppService/getWmaCodePath'

        let key = JSON.stringify({service:'weixinMiniAppService', method:'getWmaCodePath'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, 'WmaCode', key)

        return httpService
    }

    getQrCodePath(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'weixinMiniAppService/getQrCodePath'

        let key = JSON.stringify({service:'weixinMiniAppService', method:'getQrCodePath'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, 'QrCode', key)

        return httpService
    }

    decrypt(type, encryptedData, iv){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'weixinMiniAppService/decrypt'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, {type: type,encryptedData: encryptedData, iv: iv }, header, 'POST', 'json')

        return httpService
    }

    sendKefuMsg(keFuMessage){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'weixinMiniAppService/sendKefuMsg'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, keFuMessage, header, 'POST', 'json')

        return httpService
    }

}