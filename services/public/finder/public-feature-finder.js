import { HttpService } from '../../http-service'

const app = getApp()

export class PublicFeatureFinder{
    subject = 'Feature'

    getAllFeature(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicFeatureFinder/getAllFeature',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicFeatureFinder', method:'getAllFeature'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}