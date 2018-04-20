import { PublicDomainFinder } from '../../services/public/finder/public-domain-finder'
import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'

const app = getApp()

const publicDomainFinder = new PublicDomainFinder()
const publicBlockFinder = new PublicBlockFinder()


Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {

    },


    ready: function(){
        let sysInfo = wx.getSystemInfoSync()
        this.setData({height: sysInfo.windowHeight - 49})

        publicDomainFinder.getAllDomainDistrict(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'domainDistricts': res.data.list})
                }
            })

        publicBlockFinder.getAllBlock(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'blocks': res.data.list})
                    if(this.data.value.domainDistrict!=null){
                        this.setData({'filterBlocks': this.filterBlocks(this.data.value.domainDistrict.districtCode, res.data.list)})
                    }
                }
            })
    },
    moved: function(){},
    detached: function(){},

    methods: {
        filterBlocks: function(districtName, blocks){
            let filterBlocks = []
            for(let item of blocks){
                if(item.districtName == districtName){
                    filterBlocks.push(item)
                }
            }
            return filterBlocks;
        },
        onDistrictClick: function(e){
            let index = e.currentTarget.dataset.index
            if(index==-1){
                this.setData({'value.domainDistrict': null})
                this.setData({'filterBlocks': null})
            }else{
                let domainDistrict = this.data.domainDistricts[index]
                this.setData({'value.domainDistrict': domainDistrict})


                this.setData({'filterBlocks': this.filterBlocks(domainDistrict.districtName, this.data.blocks)})
            }

            this.setData({'value.block': null})

            this.triggerEvent('componentevent', {action: 'CHANGE', value:{domainDistrict: this.data.value.domainDistrict, block: null}})
        },
        onBlockClick: function(e){
            let index = e.currentTarget.dataset.index
            if(index==-1){
                this.setData({'value.block': null})
                this.triggerEvent('componentevent', {action: 'CHANGE', value:{domainDistrict: this.data.value.domainDistrict, block: null}})
            }else{
                let block = this.data.filterBlocks[index]
                this.setData({'value.block': block})
                this.triggerEvent('componentevent', {action: 'CHANGE', value:{domainDistrict: this.data.value.domainDistrict, block: block}})
            }

            this.triggerEvent('componentevent', {action: 'CLOSE'})
        }
    }

})