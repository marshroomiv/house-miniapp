const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        subMenu: null,

        domainDistrict: null,
        block: null,
        priceFrom: null,
        priceTo:null,
        areaFrom:null,
        areaTo: null,
        chamber:null,
        type:null
    },


    ready: function(){
        let sysInfo = wx.getSystemInfoSync()
        this.setData({width: sysInfo.windowWidth - 50})

        let domain = app.services.cacheService.getStorage(null,'DOMAIN')
        if(domain.rentPriceRange!=null){
            this.setData({rentPriceRange: JSON.parse(domain.rentPriceRange)})
        }else{
            this.setData({rentPriceRange: [[0,300],[300,500],[500,800],[800,1000],[1000,1500],[1500,2000],[2000,999999999]]})
        }
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onMaskClick: function(e) {
            this.triggerEvent('componentevent', {action: 'CLOSE'})
        },
        onBlock: function(e){
            this.setData({subMenu: '区域'})
        },
        onBlockEvent: function(e){
            if(e.detail.action == 'CLOSE'){
                this.setData({subMenu: null})
            }else  if(e.detail.action == 'CHANGE'){
                this.setData({domainDistrict:e.detail.value.domainDistrict,block:e.detail.value.block})
            }
        },
        onPrice: function(e){
            this.setData({subMenu: '租金'})
        },
        onPriceEvent: function(e){
            this.setData({priceFrom: e.detail.from,priceTo: e.detail.to ,subMenu: null})
        },
        onArea: function(e){
            this.setData({subMenu: '面积'})
        },
        onAreaEvent: function(e){
            this.setData({areaFrom: e.detail.from,areaTo: e.detail.to ,subMenu: null})
        },
        onChamber: function(e){
            this.setData({subMenu: '户型'})
        },
        onChamberEvent: function(e){
            this.setData({chamber: e.detail.selected,subMenu: null})
        },
        onType: function(e){
            this.setData({subMenu: '用途'})
        },
        onTypeEvent: function(e){
            this.setData({type: e.detail.selected,subMenu: null})
        },
        onCloseSubMenu: function(e){
            this.setData({subMenu: null})
        },
        onRest: function(e){
            this.setData({
                domainDistrict: null,
                block: null,
                priceFrom: null,
                priceTo:null,
                areaFrom:null,
                areaTo: null,
                chamber:null,
                type:null})
        },
        onSearch: function(e){
            let searchHouseRequest = {}
            if(this.data.domainDistrict!=null){
                searchHouseRequest.provinceName = this.data.domainDistrict.provinceName
                searchHouseRequest.cityName = this.data.domainDistrict.cityName
                searchHouseRequest.districtName = this.data.domainDistrict.districtName
            }

            if(this.data.block!=null){
                searchHouseRequest.blockUid = this.data.block.blockUid
            }

            if(this.data.priceFrom!=null && this.data.priceTo!=null){
                searchHouseRequest.priceFrom = this.data.priceFrom * 100
                searchHouseRequest.priceTo = this.data.priceTo * 100
            }

            if(this.data.areaFrom!=null && this.data.areaTo!=null){
                searchHouseRequest.areaFrom = this.data.areaFrom * 100
                searchHouseRequest.areaTo = this.data.areaTo * 100
            }

            if(this.data.chamber!=null){
                searchHouseRequest.chamberQuantity = this.data.chamber.substr(0,1)
            }

            if(this.data.type!=null){
                if(this.data.type == '住宅'){
                    searchHouseRequest.propertyTypeCode = 'APARTMENT'
                }else if(this.data.type == '别墅'){
                    searchHouseRequest.propertyTypeCode = 'VILLA'
                }else if(this.data.type == '商铺'){
                    searchHouseRequest.propertyTypeCode = 'SHOP'
                }else if(this.data.type == '写字楼'){
                    searchHouseRequest.propertyTypeCode = 'OFFICE'
                }
            }

            this.triggerEvent('componentevent', {action: 'FILTER', value: searchHouseRequest})
        }

    }

})