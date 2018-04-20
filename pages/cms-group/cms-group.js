import { PublicCmsGroupFinder } from '../../services/public/finder/public-cms-group-finder'

const app = getApp()

const publicCmsGroupFinder = new PublicCmsGroupFinder()

Page({
    data: {

    },
    onLoad: function(options) {

        let sysInfo = wx.getSystemInfoSync()
        this.setData({height: sysInfo.windowHeight})

        wx.showLoading({
            title: '加载中',
        })

        publicCmsGroupFinder.getAllCmsGroup(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data.list!=null){
                    for(let i=0;i<res.data.list.length;i++){
                        res.data.list[i].id = i
                    }
                }
                this.setData({list: res.data.list});
                this.setData({maxId: 'maxId'});
            },null,()=>{
                wx.hideLoading()
            })
    },
    onImageLoad: function(e){
        this.setData({maxId: 'maxId'});
    },
    onItemTap: function(e) {
        if(e.currentTarget.dataset.cmsuid != null){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/cms/cms',{'cmsUid': e.currentTarget.dataset.cmsuid})
            })
        }
    }
})