import { HttpService } from '../../http-service'

const app = getApp()

export class PublicHouseFinder{
    subject = 'House'

    getLatestSellHouseObjectCopy(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getLatestSellHouseObjectCopy',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getLatestSellHouseObjectCopy'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllSellHouseObjectCopy(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllSellHouseObjectCopy',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllSellHouseObjectCopy'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getHouseObjectCopyByPK(houseUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getHouseObjectCopyByPK',
            {domainUid: app.services.constantService.DOMAIN_UID, houseUid: houseUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getHouseObjectCopyByPK', houseUid: houseUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getSellHouseCountByCommunityUid(communityUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getSellHouseCountByCommunityUid',
            {domainUid: app.services.constantService.DOMAIN_UID, communityUid: communityUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getSellHouseCountByCommunityUid', communityUid: communityUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllSellHouseObjectCopyByCommunityUid(communityUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllSellHouseObjectCopyByCommunityUid',
            {domainUid: app.services.constantService.DOMAIN_UID, communityUid: communityUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllSellHouseObjectCopyByCommunityUid', communityUid: communityUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllSellHouseObjectCopyByAgentUserUid(userUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllSellHouseObjectCopyByAgentUserUid',
            {domainUid: app.services.constantService.DOMAIN_UID, userUid: userUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllSellHouseObjectCopyByAgentUserUid', userUid: userUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getSellHouseObjectsByCommunityName(communityName, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getSellHouseObjectsByCommunityName',
            {domainUid: app.services.constantService.DOMAIN_UID, communityName: communityName})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getSellHouseObjectsByCommunityName', communityName: communityName})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }


    searchSellHouseObject(searchHouseRequest, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/searchSellHouseObject',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicHouseFinder', method:'searchSellHouseObject', searchHouseRequest: searchHouseRequest})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, searchHouseRequest, header, 'POST', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    searchSellHouseObjectByUnitPrice(unitPrice, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/searchSellHouseObjectByUnitPrice',
            {domainUid: app.services.constantService.DOMAIN_UID, unitPrice: unitPrice})

        let key = JSON.stringify({service:'publicHouseFinder', method:'searchSellHouseObjectByUnitPrice', unitPrice: unitPrice})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    
    
    getAllRentHouseObjectCopy(localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllRentHouseObjectCopy',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllRentHouseObjectCopy'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getRentHouseCountByCommunityUid(communityUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getRentHouseCountByCommunityUid',
            {domainUid: app.services.constantService.DOMAIN_UID, communityUid: communityUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getRentHouseCountByCommunityUid', communityUid: communityUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllRentHouseObjectCopyByCommunityUid(communityUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllRentHouseObjectCopyByCommunityUid',
            {domainUid: app.services.constantService.DOMAIN_UID, communityUid: communityUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllRentHouseObjectCopyByCommunityUid', communityUid: communityUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getAllRentHouseObjectCopyByAgentUserUid(userUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getAllRentHouseObjectCopyByAgentUserUid',
            {domainUid: app.services.constantService.DOMAIN_UID, userUid: userUid})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getAllRentHouseObjectCopyByAgentUserUid', userUid: userUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getRentHouseObjectsByCommunityName(communityName, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/getRentHouseObjectsByCommunityName',
            {domainUid: app.services.constantService.DOMAIN_UID, communityName: communityName})

        let key = JSON.stringify({service:'publicHouseFinder', method:'getRentHouseObjectsByCommunityName', communityName: communityName})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }


    searchRentHouseObject(searchHouseRequest, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/searchRentHouseObject',
            {domainUid: app.services.constantService.DOMAIN_UID})

        let key = JSON.stringify({service:'publicHouseFinder', method:'searchRentHouseObject', searchHouseRequest: searchHouseRequest})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, searchHouseRequest, header, 'POST', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    searchRentHouseObjectByPrice(price, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicHouseFinder/searchRentHouseObjectByPrice',
            {domainUid: app.services.constantService.DOMAIN_UID, price: price})

        let key = JSON.stringify({service:'publicHouseFinder', method:'searchRentHouseObjectByPrice', price: price})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}