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
        onItemTap: function(e){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/detail/detail',{'houseUid': e.currentTarget.dataset.houseuid})
            })
        }
    }

})