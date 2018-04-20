import { CustomizedUserHouseMutator } from '../../services/customized/mutator/customized-user-house-mutator'

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
        onItemTap: function(e){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/detail/detail',{'houseUid': e.currentTarget.dataset.houseuid})
            })
        },
        onDelete: function(e){
            customizedUserHouseMutator.deleteUserHouse(e.currentTarget.dataset.houseuid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res) => {
                    if (res.data != null && res.data.value != null) {
                        wx.showToast({
                            title: '取消成功',
                            icon: 'success',
                            duration: 2000
                        })

                        this.data.value.houseObjects.splice(e.currentTarget.dataset.index)

                        this.setData({'value.houseObjects': this.data.value.houseObjects})
                    }
                })
        }
    }

})