import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'

const app = getApp()

const publicCmsFinder = new PublicCmsFinder()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        height: 464,
        initHeight: false,
        showVideo: false
    },

    attached: function(){},
    ready: function(){
        publicCmsFinder.getCmsTitles(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                this.setData({list: res.data.list})
            })
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onSwiperItemTap: function(e){
            if(e.currentTarget.dataset.index != null){
                let cms = this.data.list[e.currentTarget.dataset.index ]
                wx.navigateTo({
                    url: app.services.utilService.joinUrl('/pages/cms/cms',{'cmsUid': cms.cmsuid})
                })
            }
        },
        onMore: function(e){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/cms-group/cms-group')
            })
        }
    }

})