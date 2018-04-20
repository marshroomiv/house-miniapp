import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { PublicFeatureFinder } from '../../services/public/finder/public-feature-finder'
import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'

import {CustomizedHouseFinder} from "../../services/customized/finder/customized-house-finder";
const app = getApp()

const publicBlockFinder = new PublicBlockFinder()
const publicFeatureFinder = new PublicFeatureFinder()
const publicCommunityFinder = new PublicCommunityFinder()

const customizedHouseFinder = new CustomizedHouseFinder()

let filterHouse= function(houseObjects, sellIndicator){
    let houseObjectsFilter = []
    if(houseObjects!=null && sellIndicator!=null){
        for(let item of houseObjects){
            if(item.sellIndicator == sellIndicator){
                houseObjectsFilter.push(item)
            }
        }
    }
    return houseObjectsFilter
}

Page({
    data: {
      activeIndex: 0
    },
    onLoad: function (options) {

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

      customizedHouseFinder.getFavoriteHouseObjectsByUserUid(app.services.constantService.CACHE_READ_WRITE)
          .subscribe((res)=>{
              if(res.data != null && res.data.list != null){
                  this.setData({'houseObjects': res.data.list})
                  this.setData({'houseObjectsFilter': filterHouse(res.data.list, 'Y')})
              }
          },null,()=>{
              wx.hideLoading()
          })

      let tabNames = ['买房', '租房']

      this.setData({'appTab_0': {tabs: tabNames, activeIndex: this.data.activeIndex}})
    },
    onComponentEvent: function(e){
        let index = e.detail.value
        this.setData({activeIndex: index})

        if(index==0){
            this.setData({'houseObjectsFilter': filterHouse(this.data.houseObjects, 'Y')})
        }else{
            this.setData({'houseObjectsFilter': filterHouse(this.data.houseObjects, 'N')})
        }
    }
})