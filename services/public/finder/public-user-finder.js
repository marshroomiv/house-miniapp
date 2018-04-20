import { HttpService } from '../../http-service'

const app = getApp()

export class PublicUserFinder{
    subject = 'User'

    getAgent(userUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicUserFinder/getAgent',
            {domainUid: app.services.constantService.DOMAIN_UID, userUid: userUid})

        let key = JSON.stringify({service:'publicUserFinder', method:'getAgent', userUid: userUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}