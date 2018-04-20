import { HttpService } from '../../http-service'

const app = getApp()

export class PublicVideoFinder{
    subject = 'Video'

    getVideoByPK(videoUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicVideoFinder/getVideoByPK',
            {domainUid: app.services.constantService.DOMAIN_UID, videoUid: videoUid})

        let key = JSON.stringify({service:'publicVideoFinder', method:'getVideoByPK', videoUid: videoUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}