import { HttpService } from '../../http-service'

const app = getApp()

export class WeixinMiniAppPublicService{

    login(code){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'weixinMiniAppPublicService/login',
            {domainUid: app.services.constantService.DOMAIN_UID, domainWmaUid: app.services.constantService.WMA_UID, code: code})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
}