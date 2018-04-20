const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {

    },

    ready: function(){

    },
    moved: function(){},
    detached: function(){},

    methods: {
        onBuy: function(e){
            wx.switchTab({
                url: '/pages/buy/buy'
            })
        },
        onRent: function(e){
            wx.switchTab({
                url: '/pages/rent/rent'
            })
        },
        onFavourite:function(e){
            wx.navigateTo({
              url: '/pages/favourite/favourite'
            })
        },
        onAppointment:function(e){
            wx.navigateTo({
                url: '/pages/appointment/appointment'
            })
        }

    }

})