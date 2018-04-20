import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserHouseMutator {

    subject = 'UserHouse'

    addUserHouse(houseUid) {

        app.services.cacheService.clearSubject([this.subject, 'House'])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserHouseMutator/addUserHouse', {houseUid: houseUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    deleteUserHouse(houseUid) {

        app.services.cacheService.clearSubject([this.subject, 'House'])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserHouseMutator/deleteUserHouse', {houseUid: houseUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
}

