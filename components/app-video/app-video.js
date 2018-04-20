import { PublicVideoFinder } from '../../services/public/finder/public-video-finder'

const app = getApp()
const publicVideoFinder = new PublicVideoFinder()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {},

    attached: function(){},
    ready: function(){
        publicVideoFinder.getVideoByPK(this.data.value.videoUid, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    this.setData({'video': res.data.value})
                    let sysInfo = wx.getSystemInfoSync()
                    if(res.data.value.width > res.data.value.height){
                        this.setData({width: sysInfo.windowWidth, height: Math.round((sysInfo.windowWidth - 20) / res.data.value.width * res.data.value.height)})
                    }else{
                        this.setData({width: sysInfo.windowWidth, height: Math.round(sysInfo.windowHeight / 3)})
                    }
                }
            })
    },
    moved: function(){},
    detached: function(){},

    methods: {

    }

})