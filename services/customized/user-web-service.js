import { HttpService } from '../http-service'

const app = getApp()

export class UserWebservice{

    getLoginInfo(){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'userWebservice/getLoginInfo'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

}