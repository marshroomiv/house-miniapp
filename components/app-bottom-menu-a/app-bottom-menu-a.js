 import {CustomizedUserHouseMutator} from "../../services/customized/mutator/customized-user-house-mutator";

const app = getApp()

const customizedUserHouseMutator = new CustomizedUserHouseMutator()


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
        onCall: function (e) {
            if (this.data.value.agent != null) {
                wx.makePhoneCall({
                    phoneNumber: this.data.value.agent.phone
                })
            }
        },
        onNavi: function (e) {
            if (this.data.value.communityObject != null && this.data.value.communityObject.longitude != null) {
                wx.openLocation({
                    longitude: Number(this.data.value.communityObject.longitude),
                    latitude: Number(this.data.value.communityObject.latitude),
                    name: this.data.value.communityObject.name,
                    address: this.data.value.communityObject.districtName + this.data.value.communityObject.addressDetail
                })
            }
        },
        onMoreAgent: function (e) {
            if(this.data.value.sellIndicator=='Y'){
                wx.navigateTo({
                    url: app.services.utilService.joinUrl('/pages/more-agent-sell/more-agent-sell', {userUid: this.data.value.agent.userUid})
                })
            }else{
                wx.navigateTo({
                    url: app.services.utilService.joinUrl('/pages/more-agent-rent/more-agent-rent', {userUid: this.data.value.agent.userUid})
                })
            }
        },
        onFavorite: function (e) {
             customizedUserHouseMutator.addUserHouse(this.data.value.houseObject.houseUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res) => {
                    if (res.data != null && res.data.value != null) {
                        wx.showToast({
                            title: '收藏成功',
                            icon: 'success',
                            duration: 2000,
                        })
                    }
                })
        },
        onAppointment: function (e) {
            let requirementTypeCode = this.data.value.houseObject.sellIndicator=='Y'?'BUY':'RENT'
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/appointment/appointment', {agentName: this.data.value.agent.nickName,agentPhone:this.data.value.agent.phone,
                    houseUid:this.data.value.houseObject.houseUid, houseTitle: this.data.value.houseObject.houseTitle, houseCoverPicturePath: this.data.value.houseObject.houseCoverPicturePath,
                    requirementTypeCode: requirementTypeCode})
            })
        }

    }

})