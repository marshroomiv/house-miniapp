import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { PublicFeatureFinder } from '../../services/public/finder/public-feature-finder'
import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'
import { PublicHouseFinder } from '../../services/public/finder/public-house-finder'
import { CommonService } from '../../services/common-service'

const app = getApp()

const commonService = new CommonService()

const publicBlockFinder = new PublicBlockFinder()
const publicFeatureFinder = new PublicFeatureFinder()
const publicCommunityFinder = new PublicCommunityFinder()
const publicHouseFinder = new PublicHouseFinder()

Page({
    data: {
    },
    onLoad: function(options) {

        if (options.communityUid == null) {
            app.services.utilService.toHomePage()
        }

        wx.showLoading({
            title: '加载中',
        })

        publicBlockFinder.getAllBlock(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'blocks': res.data.list})
                }
            })

        publicFeatureFinder.getAllFeature(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'features':res.data.list })
                }
            })

        publicCommunityFinder.getAllCommunityObjectCopy(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'communityObjects': res.data.list})
                }
            })

        publicHouseFinder.getAllRentHouseObjectCopyByCommunityUid(options.communityUid,app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'houseObjects':res.data.list})
                }
            },null,()=>{
                wx.hideLoading()
            })

    }
})