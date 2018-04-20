import { HttpService } from '../../http-service'

const app = getApp()

export class PublicSlideShowFinder{
    subject = 'SlideShow'

    getSlideShowObjectCopyByName( slideShowName, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicSlideShowFinder/getSlideShowObjectCopyByName',
            {domainUid: app.services.constantService.DOMAIN_UID, slideShowName: slideShowName})

        let key = JSON.stringify({service:'publicSlideShowFinder', method:'getSlideShowObjectCopyByName', slideShowName:slideShowName})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getSlideShowObjectCopyByUid( slideShowUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicSlideShowFinder/getSlideShowObjectCopyByUid',
            {domainUid: app.services.constantService.DOMAIN_UID, slideShowUid: slideShowUid})

        let key = JSON.stringify({service:'publicSlideShowFinder', method:'getSlideShowObjectCopyByUid', slideShowUid:slideShowUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

}