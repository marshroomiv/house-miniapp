import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedAppointmentFinder{

    subject = 'Appointment'

    getAllAppointment(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedAppointmentFinder/getAllAppointment'

        let key = JSON.stringify({service:'customizedAppointmentFinder', method:'getAllAppointment'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }


    getAllAppointmentDomain(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedAppointmentFinder/getAllAppointmentDomain'

        let key = JSON.stringify({service:'customizedAppointmentFinder', method:'getAllAppointmentDomain'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}