import { HttpService } from '../../http-service'

const app = getApp()

export class PublicCommunityFinder{
    subject = 'Community'

    getAllCommunityObjectCopy(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCommunityFinder/getAllCommunityObjectCopy',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicCommunityFinder', method:'getAllCommunityObjectCopy'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getCommunityObjectCopyByPK(communityUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCommunityFinder/getCommunityObjectCopyByPK',
            {domainUid: app.services.constantService.DOMAIN_UID, communityUid: communityUid})

        let key = JSON.stringify({service:'publicCommunityFinder', method:'getCommunityObjectCopyByPK', communityUid: communityUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}