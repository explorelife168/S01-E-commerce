"use strict";(self["webpackChunke_commerce_s01"]=self["webpackChunke_commerce_s01"]||[]).push([[816],{7010:function(t,e,a){a.d(e,{W:function(){return n}});const n={createNewProduct:!1,createNewCoupon:!1,checkProductSwitch:!1,editProducts:!0,productsId:"",editCoupon:!0,couponId:{},userDataSwitch:!1};e.Z=n},6823:function(t,e,a){var n=a(9321),o=a(2835),s=a(9999);const i=(0,n.Q_)({id:"Data",state:()=>({products:[],product:{},cartsItem:[],pagination:{category:null,current_page:1,has_next:!1,has_pre:!1,total_pages:1},message:"",alertSwitch:!1,stopMessageSwitch:!1,isLoading:!1,final_total:0,total:0,updateCouponList:[],couponPagination:{category:null,current_page:1,has_next:!1,has_pre:!1,total_pages:1},signInCheck:!1}),getters:{getLoginStatus(t){return t.signInCheck}},actions:{async getProducts(t=1){this.isLoading=!0;const e=`${o.Z.API_PATH}/api/${o.Z.CUSTOM_PATH}/products?page=${t}`,a=await s.Z.get(e);this.products=a.data.products,this.pagination=a.data.pagination,console.log("response:",a),this.isLoading=!1},async getProduct(t){const e=`${o.Z.API_PATH}/api/${o.Z.CUSTOM_PATH}/product/${t}`,a=await s.Z.get(e);this.product=a.data.product},async getCartsItem(){const t=`${o.Z.API_PATH}/api/${o.Z.CUSTOM_PATH}/cart`,e=await s.Z.get(t);this.cartsItem=e.data.data.carts,this.total=e.data.data.total,this.final_total=e.data.data.final_total},async getCouponList(t=1){const e=`${o.Z.API_PATH}/api/${o.Z.CUSTOM_PATH}/admin/coupons?page=${t}`,a=await s.Z.get(e);this.updateCouponList=a.data.coupons,this.couponPagination=a.data.pagination},errorMessage(t){this.stopMessageSwitch||(this.message=t,this.alertSwitch=!0,this.autoCloseMessage())},autoCloseMessage(){setTimeout((()=>{this.message="",this.alertSwitch=!1}),5e3)},actionLoginStatus(){this.signInCheck=!this.signInCheck}}});e.Z=i},7816:function(t,e,a){a.r(e),a.d(e,{default:function(){return m}});var n=a(3396),o=a(4870),s=a(7139),i=a(9242),l=a(5513),c=a.n(l),u=a(6823),d=a(7010),r=a(2835),p=a(9999);const _=t=>((0,n.dD)("data-v-68cc4e95"),t=t(),(0,n.Cn)(),t),g={class:"coupon-wrap"},C={class:"coupons"},h=_((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("td",null,"Due_Date"),(0,n._)("td",null,"Title"),(0,n._)("td",null,"Code"),(0,n._)("td",null,"Percent"),(0,n._)("td",null,"Is_Enabled"),(0,n._)("td",null,"Edit")])],-1))),v=["onClick"],w=["onClick"],P={class:"pagination"},Z={class:"left-btn"},b=["onClick"],k={class:"right-btn"};var S=(0,n.aZ)({__name:"index",setup(t){const e=(0,u.Z)(),a=(0,o.iH)(d.Z),l=(0,o.iH)(!1),_=(0,n.Fl)((()=>e.updateCouponList)),S=(0,n.Fl)((()=>e.couponPagination)),I=()=>(a.value.createNewCoupon=!0,a.value.editCoupon=!1),T=async t=>{l.value=!0;const a=`${r.Z.API_PATH}/api/${r.Z.CUSTOM_PATH}/admin/coupon/${t}`,n=await p.Z.delete(a);console.log(n),console.log("刪除成功"),e.getCouponList(),l.value=!1},m=t=>{a.value.editCoupon=!0,a.value.createNewCoupon=!0,a.value.couponId=t},A=t=>{if(t)return new Date(1e3*t).toISOString().replace("T"," ").substring(0,19)};return e.getCouponList(),(t,a)=>((0,n.wg)(),(0,n.iD)("div",g,[(0,n.Wm)((0,o.SU)(c()),{active:l.value,"onUpdate:active":a[0]||(a[0]=t=>l.value=t)},null,8,["active"]),(0,n._)("div",{class:"create-btn"},[(0,n._)("button",{class:"btn",onClick:I},"NewCoupon")]),(0,n._)("div",C,[(0,n._)("table",null,[h,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(_.value,((t,e)=>((0,n.wg)(),(0,n.iD)("tr",{key:e},[(0,n._)("td",null,(0,s.zw)(A(t.due_date)),1),(0,n._)("td",null,(0,s.zw)(t.title),1),(0,n._)("td",null,(0,s.zw)(t.code),1),(0,n._)("td",null,(0,s.zw)(t.percent),1),(0,n._)("td",null,(0,s.zw)(1==t.is_enabled?"啟用":"未啟用"),1),(0,n._)("td",null,[(0,n._)("button",{class:"edit",onClick:e=>m(t)}," Edit ",8,v),(0,n._)("button",{class:"delete",onClick:e=>T(t.id)}," Delete ",8,w)])])))),128))])])]),(0,n._)("div",P,[(0,n._)("div",Z,[(0,n._)("button",{onClick:a[1]||(a[1]=(0,i.iM)((t=>(0,o.SU)(e).getCouponList(S.value.current_page-1)),["prevent"])),class:(0,s.C_)(["left",{disabled:!S.value.has_pre}])}," << ",2)]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(S.value.total_pages,((t,a)=>((0,n.wg)(),(0,n.iD)("div",{class:"pages-btn",key:a},[(0,n._)("button",{class:(0,s.C_)([`pages-${t}`,{active:S.value.current_page===t}]),onClick:(0,i.iM)((a=>(0,o.SU)(e).getCouponList(t)),["prevent"])},(0,s.zw)(t),11,b)])))),128)),(0,n._)("div",k,[(0,n._)("button",{onClick:a[2]||(a[2]=(0,i.iM)((t=>(0,o.SU)(e).getCouponList(S.value.current_page+1)),["prevent"])),class:(0,s.C_)(["right",{disabled:!S.value.has_next}])}," >> ",2)])])]))}}),I=a(89);const T=(0,I.Z)(S,[["__scopeId","data-v-68cc4e95"]]);var m=T}}]);
//# sourceMappingURL=816.228441db.js.map