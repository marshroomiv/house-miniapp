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
        appHomeTap: function(e) {
            app.services.utilService.toHomePage()
        }
    }

})