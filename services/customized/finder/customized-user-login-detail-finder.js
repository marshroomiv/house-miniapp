import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserLoginDetailFinder{

    subject = 'UserLoginDetail'

    getUserLoginDetailsByUid(userUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserLoginDetailFinder/getUserLoginDetailsByUid',
            {userUid: userUid})

        let key = JSON.stringify({service:'customizedUserLoginDetailFinder', method:'getUserLoginDetailsByUid', userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

}