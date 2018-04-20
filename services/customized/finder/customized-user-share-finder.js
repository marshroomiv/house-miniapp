import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserShareFinder{

    subject = 'UserShare'

    getUserShares(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserShareFinder/getUserShares'

        let key = JSON.stringify({service:'customizedUserShareFinder', method:'getUserShares'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

}