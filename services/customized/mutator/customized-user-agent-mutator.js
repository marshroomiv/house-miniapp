import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserAgentMutator{

    subject = 'UserAgent'

    addUserAgent( agentUid){

        app.services.cacheService.clearSubject([this.subject,'User'])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserAgentMutator/addUserAgent',{agentUid: agentUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    deleteUserAgent( agentUid){

        app.services.cacheService.clearSubject([this.subject,'User'])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserAgentMutator/deleteUserAgent',{agentUid: agentUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
}