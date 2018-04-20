import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserFinder{

    subject = 'User'

    getUser(){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUser'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    getUserObjectsByRoleDomain(roleName, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsByRoleDomain',
            {roleName: roleName})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsByRoleDomain', roleName: roleName})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObjectsDomain(query, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsDomain',
            {query: query})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsDomain', query: query})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObjectsByStatusDomain(userStatusCode, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsByStatusDomain',
            {userStatusCode: userStatusCode})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsByStatusDomain', userStatusCode: userStatusCode})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAgentUserObjectsByUserUid(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getAgentUserObjectsByUserUid'

        let key = JSON.stringify({service:'customizedUserFinder', method:'getAgentUserObjectsByUserUid'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAgentUserObjectsDomain(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getAgentUserObjectsDomain'

        let key = JSON.stringify({service:'customizedUserFinder', method:'getAgentUserObjectsDomain'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}