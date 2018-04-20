import { CustomizedUserFinder } from '../../services/customized/finder/customized-user-finder'
import { CustomizedUserMutator } from '../../services/customized/mutator/customized-user-mutator'

const customizedUserFinder = new CustomizedUserFinder()
const customizedUserMutator = new CustomizedUserMutator()
const app = getApp()

Page({
    data: {
        searchVal: '',
        activeIndex: 0
    },
    searchUser: function(){

        customizedUserFinder.getUserObjectsDomain(this.data.searchVal, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    for(let userObject of res.data.list){
                        if(userObject.userRoleObjectList != null){
                            for(let item of userObject.userRoleObjectList){
                                if(item.roleUid == this.data.domainAdminRoleUid){
                                    userObject.isAdmin = true
                                    break
                                }
                            }
                        }
                    }
                    this.setData({userObjects: res.data.list})
                }else{
                    this.setData({userObjects: null})
                }
            },null,()=>{
                wx.hideLoading()
            })
    },
    onLoad: function(options) {

        let user = app.services.cacheService.getStorage(null, 'USER')
        this.setData({user: user})

        let roles = app.services.cacheService.getStorage(null, 'ROLES')
        for(let item of roles){
            if(item.roleName == 'DOMAIN_ADMIN_ROLE'){
                this.setData({domainAdminRoleUid: item.roleUid})
            }
        }

        wx.showLoading({
            title: '加载中',
        })

        let tabNames = []
        tabNames.push('会员')
        tabNames.push('管理员')
        tabNames.push('经纪人')
        tabNames.push('禁止')
        this.setData({'appTab_0': {tabs: tabNames, activeIndex: this.data.activeIndex}})

        this.searchUser()
    },
    onComponentEvent: function(e){
        this.setData({[`${e.detail.key}`] : e.detail.value})

        let activeIndex = e.detail.value

        this.setData({userObjects: null})

        if(activeIndex==0){
            this.searchUser()
        }else if(activeIndex==1){
            customizedUserFinder.getUserObjectsByRoleDomain('DOMAIN_ADMIN_ROLE', app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({userObjects: res.data.list})
                    }else{
                        this.setData({userObjects: null})
                    }
                })
        }else if(activeIndex==2){
            customizedUserFinder.getAgentUserObjectsDomain(app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({userObjects: res.data.list})
                    }else{
                        this.setData({userObjects: null})
                    }
                })
        }else if(activeIndex==3){
            customizedUserFinder.getUserObjectsByStatusDomain('INACTIVE', app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({userObjects: res.data.list})
                    }else{
                        this.setData({userObjects: null})
                    }
                })
        }
    },
    onBan: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        if(userObject.userStatusCode == 'ACTIVE'){
            wx.showModal({
                content: '确定禁止此用户登录?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.addBanUserDomain(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].userStatusCode`]: 'INACTIVE'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].userStatusCode`]: 'ACTIVE'})
                    }
                }
            })
        }else{
            wx.showModal({
                content: '确定解禁此用户登录?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.removeBanUserDomain(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].userStatusCode`]: 'ACTIVE'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].userStatusCode`]: 'INACTIVE'})
                    }
                }
            })
        }
    },
    onAdmin: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]

        if(userObject.isAdmin){
            wx.showModal({
                content: '确定取消此用户管理员权限?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.removeDomainAdminDomain(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].isAdmin`]: false})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].isAdmin`]: true})
                    }
                }
            })
        }else{
            wx.showModal({
                content: '确定设此用户为管理员?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.setDomainAdminDomain(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].isAdmin`]: true})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].isAdmin`]: false})
                    }
                }
            })
        }

    },
    onAgent: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]

        this.setData({selectedIndex: index})
        this.setData({selectedUserObject: userObject})
        if(userObject.agentIndicator=='Y'){
            wx.showModal({
                content: '确定取消此经纪人身份?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.removeAgentDomain(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].agentIndicator`]: 'N'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].agentIndicator`]: 'Y'})
                    }
                }
            })
        }else{
            this.setData({showFormA: true})
        }
    },
    onCancelAdmin: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        wx.showModal({
            content: '确定取消此用户管理员权限?',
            success: (res)=> {
                if (res.confirm) {
                    customizedUserMutator.removeDomainAdminDomain(userObject.userUid)
                        .subscribe((res)=>{
                            this.setData({[`userObjects[${index}].isDeleted`]: true})
                            wx.showToast({
                                title: '操作成功',
                                icon: 'success'
                            })
                        })
                }
            }
        })
    },
    onCancelAgent: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        wx.showModal({
            content: '确定取消此经纪人身份?',
            success: (res)=> {
                if (res.confirm) {
                    customizedUserMutator.removeDomainAdminDomain(userObject.userUid)
                        .subscribe((res)=>{
                            this.setData({[`userObjects[${index}].isDeleted`]: true})
                            wx.showToast({
                                title: '操作成功',
                                icon: 'success'
                            })
                        })
                }
            }
        })
    },
    onCancelBan: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        wx.showModal({
            content: '确定解禁此用户登录?',
            success: (res)=> {
                if (res.confirm) {
                    customizedUserMutator.removeAgentDomain(userObject.userUid)
                        .subscribe((res)=>{
                            this.setData({[`userObjects[${index}].agentIndicator`]: 'N'})
                            wx.showToast({
                                title: '操作成功',
                                icon: 'success'
                            })
                        })
                }
            }
        })
    },
    onDetail: function(e) {
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]

        app.services.cacheService.setStorage('NAV','dm-user-info',{userObject: userObject} )
        wx.navigateTo({
            url: '/pages/dm-user-info/dm-user-info'
        })
    },
    onFormEvent: function(e) {
        if(e.detail.action == 'CANCEL'){
            this.setData({[`userObjects[${this.data.selectedIndex}].agentIndicator`]: 'N'})
        }else{
            let user = {userUid: e.detail.value.userUid, nickName: e.detail.value.nickName, phone: e.detail.value.phone}
            customizedUserMutator.setAgentDomain(user)
                .subscribe((res)=>{
                    this.setData({[`userObjects[${this.data.selectedIndex}].agentIndicator`]: 'Y'})
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success'
                    })
                },()=>{
                    this.setData({[`userObjects[${this.data.selectedIndex}].agentIndicator`]: 'N'})
                })
        }
        this.setData({showFormA: false})
    },
    onSearch: function(e){
        this.searchUser()
    },
    clearInput: function (e) {
        this.setData({
            searchVal: ''
        })
        this.searchUser()
    },
    onSearchInput: function (e) {
        this.setData({
            searchVal: e.detail.value
        })

        if(this.data.searchVal==null || this.data.searchVal ==''){
            this.searchUser()
        }
    }
})