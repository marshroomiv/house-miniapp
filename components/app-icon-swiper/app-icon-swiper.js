Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {},

    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
        onIconSwiperItemTap: function(e){
            if(e.currentTarget.dataset.url != null){
                wx.navigateTo({
                    url: e.currentTarget.dataset.url
                })
            }
        }
    }

})