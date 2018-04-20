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

        onFocus: function (e) {
            customizedUserAgentMutator.addUserAgent(this.data.value.agent.userUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res) => {
                    if (res.data != null && res.data.value != null) {
                        wx.showToast({
                            title: '关注成功',
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
        onMoreAgent: function (e) {
            if(this.data.value.sellIndicator==null){
                return
            }

            if(this.data.value.sellIndicator=='Y'){
                wx.navigateTo({
                    url: app.services.utilService.joinUrl('/pages/more-agent-sell/more-agent-sell', {userUid: this.data.value.agent.userUid})
                })
            }else{
                wx.navigateTo({
                    url: app.services.utilService.joinUrl('/pages/more-agent-rent/more-agent-rent', {userUid: this.data.value.agent.userUid})
                })
            }
        }
    }

})