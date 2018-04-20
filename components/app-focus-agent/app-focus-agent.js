import { CustomizedUserAgentMutator } from '../../services/customized/mutator/customized-user-agent-mutator'

const app = getApp()

const customizedUserAgentMutator = new CustomizedUserAgentMutator()


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

        onCancel: function (e) {
            customizedUserAgentMutator.deleteUserAgent(this.data.value.agent.userUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res) => {
                    if (res.data != null && res.data.value != null) {

                        this.triggerEvent('componentevent', this.data.value.agent.userUid)

                        wx.showToast({
                            title: '取消成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
        },
        onCall: function (e) {
            if (this.data.value.agent != null) {
                wx.makePhoneCall({
                    phoneNumber: this.data.value.agent.phone
                })
            }
        },
        onAgentHouse: function (e) {
            if (this.data.value.agent != null && !this.data.value.agentHouse) {
                wx.navigateTo({
                    url: '/pages/more-agent/more-agent?userUid=' + this.data.value.agent.userUid
                })
            }
        }
    }

})