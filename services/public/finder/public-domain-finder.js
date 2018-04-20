import { HttpService } from '../../http-service'

const app = getApp()

export class PublicDomainFinder{
    subject = 'Domain'

    getAllDomainWmaContact(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicDomainFinder/getAllDomainWmaContact',
            {domainUid: app.services.constantService.DOMAIN_UID, domainWmaUid: app.services.constantService.WMA_UID})

        let key = JSON.stringify({service:'publicDomainFinder', method:'getAllDomainWmaContact'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllDomainDistrict(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicDomainFinder/getAllDomainDistrict',
            {domainUid: app.services.constantService.DOMAIN_UID, domainWmaUid: app.services.constantService.WMA_UID})

        let key = JSON.stringify({service:'publicDomainFinder', method:'getAllDomainDistrict'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}