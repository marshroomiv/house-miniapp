import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { PublicFeatureFinder } from '../../services/public/finder/public-feature-finder'
import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'
import { PublicHouseFinder } from '../../services/public/finder/public-house-finder'

const app = getApp()

const publicBlockFinder = new PublicBlockFinder()
const publicFeatureFinder = new PublicFeatureFinder()
const publicCommunityFinder = new PublicCommunityFinder()
const publicHouseFinder = new PublicHouseFinder()

Page({
    data: {
        searchVal: ''
    },
    onLoad: function(options) {

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

        publicHouseFinder.getAllRentHouseObjectCopy(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'houseObjects':res.data.list})
                }
            },null,()=>{
                wx.hideLoading()
            })

    },
    onSearch: function(e){
        if(this.data.searchVal==null || this.data.searchVal.length==0){
            app.services.utilService.showModal('请输入小区名')
            return
        }

        publicHouseFinder.getRentHouseObjectsByCommunityName(this.data.searchVal.trim(),app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'houseObjects':res.data.list})
                }else{
                    this.setData({'houseObjects':null})
                }
            })

    },
    clearInput: function (e) {
        this.setData({
            searchVal: ""
        });
        publicHouseFinder.getAllRentHouseObjectCopy(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'houseObjects':res.data.list})
                }
            })
    },
    onSearchInput: function (e) {
        this.setData({searchVal: e.detail.value})
        if(this.data.searchVal==null || this.data.searchVal==''){
            publicHouseFinder.getAllRentHouseObjectCopy(app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({'houseObjects':res.data.list})
                    }
                })
        }
    },
    onMenuEvent: function (e) {
        if(e.detail.action=='SORT'){
            let houseObjects = this.data.houseObjects
            if(houseObjects==null){
                return
            }

            if(e.detail.value.sortItem == 'UNIT_PRICE'){
                houseObjects.sort((a,b)=>{
                    if(e.detail.value.sortType == 'UP'){
                        if(a.unitPrice > b.unitPrice){
                            return 1
                        }else{
                            return -1
                        }
                    }else{
                        if(a.unitPrice > b.unitPrice){
                            return -1
                        }else{
                            return 1
                        }
                    }
                })
            }else if(e.detail.value.sortItem == 'PRICE'){
                houseObjects.sort((a,b)=>{
                    if(e.detail.value.sortType == 'UP'){
                        if(a.price > b.price){
                            return 1
                        }else{
                            return -1
                        }
                    }else{
                        if(a.price > b.price){
                            return -1
                        }else{
                            return 1
                        }
                    }
                })
            }else if(e.detail.value.sortItem == 'AREA'){
                houseObjects.sort((a,b)=>{
                    if(e.detail.value.sortType == 'UP'){
                        if(a.area > b.area){
                            return 1
                        }else{
                            return -1
                        }
                    }else{
                        if(a.area > b.area){
                            return -1
                        }else{
                            return 1
                        }
                    }
                })
            }
            this.setData({'houseObjects':houseObjects})
        }else if(e.detail.action=='FILTER'){
            let searchHouseRequest = e.detail.value

            publicHouseFinder.searchRentHouseObject(searchHouseRequest, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null){
                        this.setData({'houseObjects':res.data.list})
                    }
                })
        }
    }
})