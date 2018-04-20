import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserShareMutator{

    subject = 'UserShare'

    addUserShare( sharerUid){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserShareMutator/addUserShare',{sharerUid: sharerUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

}