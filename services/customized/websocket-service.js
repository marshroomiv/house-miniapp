import { HttpService } from '../http-service'

const app = getApp()

export class WebsocketService{

    login(uid){

        let jwtToken = app.services.cacheService.getStorage(null, 'JWT_TOKEN')

        let url = app.services.utilService.joinUrl1(
            app.services.constantService.WS_BASE_URL + 'websocketService/login',
            {uid: uid, jwtToken: jwtToken})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
}