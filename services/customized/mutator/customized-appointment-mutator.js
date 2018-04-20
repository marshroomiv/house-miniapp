import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedAppointmentMutator{

    subject = 'Appointment'

    addAppointment( appointment){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedAppointmentMutator/addAppointment'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, appointment, header, 'POST', 'json')

        return httpService
    }

    modifyAppointmentDomain( appointment){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedAppointmentMutator/modifyAppointmentDomain'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, appointment, header, 'POST', 'json')

        return httpService
    }

    inactivateAppointmentDomain(userUid, appointmentUid) {

        app.services.cacheService.clearSubject([this.subject, 'House'])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedAppointmentMutator/inactivateAppointmentDomain', {userUid: userUid, appointmentUid: appointmentUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
}