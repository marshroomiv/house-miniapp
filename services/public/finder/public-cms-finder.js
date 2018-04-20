import { HttpService } from '../../http-service'

const app = getApp()

export class PublicCmsFinder{
    subject = 'Cms'

    getCmsCmsItems(cmsUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsCmsItems',
            {domainUid: app.services.constantService.DOMAIN_UID, cmsUid: cmsUid})

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsCmsItems', cmsUid: cmsUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getCmsTitles(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsTitles',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsTitles'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getCmsObjectMap(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsObjectMap',
            {domainUid: app.services.constantService.DOMAIN_UID,domainWmaUid:app.services.constantService.WMA_UID })

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsObjectMap'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}