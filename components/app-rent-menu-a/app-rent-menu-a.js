const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        showFilter:false,
        sortItem: null,
        sortType: 'UP'
    },


    ready: function(){


    },
    moved: function(){},
    detached: function(){},

    methods: {
        onSort: function(e){
            let item = e.currentTarget.dataset.item
            if(item == this.data.sortItem){
                if(this.data.sortType == 'UP'){
                    this.setData({sortType: 'DOWN'})
                }else{
                    this.setData({sortType: 'UP'})
                }
            }else{
                this.setData({sortItem: item, sortType: 'UP'})
            }
            this.triggerEvent('componentevent', {action: 'SORT', value:{sortItem:this.data.sortItem, sortType:this.data.sortType}})
        },
        onFilter: function(e){
            this.setData({showFilter: true})
        },
        onFilterEvent: function(e){
            if(e.detail.action == 'CLOSE'){
                this.setData({showFilter: false})
            }else if(e.detail.action == 'FILTER'){
                this.setData({sortItem:null, sortType:'UP',showFilter: false})
                this.triggerEvent('componentevent', {action: 'FILTER', value:e.detail.value})
            }
        }

    }

})