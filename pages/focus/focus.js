import {CustomizedUserFinder} from "../../services/customized/finder/customized-user-finder";

const app = getApp()
const customizedUserFinder = new CustomizedUserFinder()

Page({
  data: {
  
  },
  onLoad: function (options) {

      wx.showLoading({
          title: '加载中',
      })

      customizedUserFinder.getAgentUserObjectsByUserUid(app.services.constantService.CACHE_READ_WRITE)
          .subscribe((res)=>{
              if(res.data != null && res.data.list != null){
                  this.setData({'userObjects': res.data.list})
                  console.log(res.data.list)
              }
          },null,()=>{
              wx.hideLoading()
          })
  },
    onComponentEvent:function(e){
        let userUid = e.detail
        for(let i=0; i< this.data.userObjects.length; i++){
            let item = this.data.userObjects[i]
            if(item.userUid == userUid){
                this.data.userObjects.splice(i,1)
            }
            this.setData({'userObjects': this.data.userObjects})
        }
    }

})