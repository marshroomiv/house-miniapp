export class ConstantService{

    //DOMAIN_UID = 'cnXxVXYfRDaJalfCTjYlSw'
    //WMA_UID = 'jKHss1oLRyi2RQ7q9BbrOXA'
    //wxd84ade8833bbb251 Joe test

    DOMAIN_UID = 'cnXxVXYfRDaJalfCTjYlSw'
    WMA_UID = 'w9B1RWBokR9BC4wE6uNIzGug'
    //wx45b2d9eb36a5be83 zhaowu fang chan

    //DOMAIN_UID = 'jafPan9AKSkCwxQNrJ9CmCuQ'
    //WMA_UID = 'XQhgfymGRASW5wsH9BVGvdw'
    //wx1faae2a11d9e1b3f ping ding shan


    CACHE_NONE = 'NONE'
    CACHE_WRITE = 'WRITE'
    CACHE_READ_WRITE = 'READ_WRITE'

    LONG_CACHE_TTL = 1440//1day
    DEFAULT_CACHE_TTL = 60//1hour
    SHORT_CACHE_TTL = 5//

    //HOST = 'localhost:8080'
    //HOST = 'huawei.zhaowu.cc'
    HOST = 'saas1.zhaowu.cc'

    WSS_URL = 'wss://' + this.HOST + '/house-service/'

    WSS_FUN_URL = '/house-service/services/rs/websocketService/'
    WSS_SUB_URL =  this.WSS_FUN_URL + 'subscribe'
    WSS_CALL_URL = this.WSS_FUN_URL + 'call'

    WS_URL = 'https://'+ this.HOST + '/house-service/'

    //FILE_URL = 'http://localhost:9999/saas-files/'
    FILE_URL = 'http://' + this.HOST + '/files/'

    WS_BASE_URL = this.WS_URL+'services/rs/'
    WS_CUSTOMIZED_BASE_URL = this.WS_URL+'services/customized/rs/'
    WS_CUSTOMIZED_PUBLIC_BASE_URL = this.WS_URL+'services/customized/public/rs/'

    VERSION = 'v1.0.0'
}