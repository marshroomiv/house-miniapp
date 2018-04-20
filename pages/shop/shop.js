import { PublicDomainFinder } from '../../services/public/finder/public-domain-finder'
import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import { CommonService } from '../../services/common-service'

let wxParse = require('../../wxParse/wxParse.js');

const app = getApp()

const publicDomainFinder = new PublicDomainFinder()
const publicCmsFinder = new PublicCmsFinder()
const commonService = new CommonService()

Page({
    data: {
        activeIndex: 0
    },
    onLoad: function(options) {

        if(options.sharerUid != null){
            commonService.addShare(options.sharerUid)
        }

        let systemInfo = wx.getSystemInfoSync()
        this.setData({height: systemInfo.windowHeight, width: systemInfo.windowWidth})

        publicDomainFinder.getAllDomainWmaContact(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null && res.data.list.length>0){
                    res.data.list.sort(app.services.utilService.sortAsc)
                    for(let item of res.data.list){
                        if(item.shopName.length>5){
                            item.shopName = item.shopName.substring(0,5)
                        }
                    }

                    this.setData({domainWmaContacts: res.data.list})

                    if(res.data.list[0].cmsUid!=null){

                        publicCmsFinder.getCmsCmsItems(res.data.list[0].cmsUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res)=> {
                                    if(res.data.value.cms!=null){
                                        let that = this
                                        if(this.data.domainWmaContacts.length>1){
                                            wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 47)
                                        }else{
                                            wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 10)
                                        }
                                    }
                            })
                    }
                }
            })
    },
    onItemTap: function(e){
        let activeIndex = e.currentTarget.dataset.index
        this.setData({activeIndex: activeIndex})

        let domainWmaContact = this.data.domainWmaContacts[activeIndex]

        if(domainWmaContact.cmsUid!=null){

            publicCmsFinder.getCmsCmsItems(domainWmaContact.cmsUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=> {
                    if(res.data.value.cms!=null){
                        let that = this
                        if(this.data.domainWmaContacts.length>1){
                            wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 47)
                        }else{
                            wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 10)
                        }
                    }
                })
        }
    },
    onNavi: function(e){
        let index = e.currentTarget.dataset.index
        let domainWmaContact = this.data.domainWmaContacts[index]

        wx.openLocation({
            longitude: Number(domainWmaContact.longitude),
            latitude: Number(domainWmaContact.latitude),
            name: domainWmaContact.shopName,
            address: domainWmaContact.districtName + domainWmaContact.addressDetail
        })
    },
    onCall: function(e){
        let phone = e.currentTarget.dataset.phone
        if(phone!=null){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
    onShareAppMessage: function (res) {
        return commonService.onShareShop()
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})