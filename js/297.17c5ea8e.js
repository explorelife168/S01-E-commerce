"use strict";(self["webpackChunke_commerce_s01"]=self["webpackChunke_commerce_s01"]||[]).push([[297],{7010:function(t,e,a){a.d(e,{W:function(){return c}});const c={createNewProduct:!1,createNewCoupon:!1,checkProductSwitch:!1,editProducts:!0,productsId:"",editCoupon:!0,couponId:{},userDataSwitch:!1};e.Z=c},5368:function(t,e,a){function c(t){const e=Number(t);return`$${e.toFixed(0).replace(/./g,((t,e,a)=>{const c=e&&"."!==t&&(a.length-e)%3===0?`, ${t}`.replace(/\s/g,""):t;return c}))}`}a.d(e,{Z:function(){return c}})},8297:function(t,e,a){a.r(e),a.d(e,{default:function(){return R}});var c=a(3396),s=a(4870),l=a(7139),i=a(9242),o=a(7749),n=a(8552),r=a(5513),u=a.n(r),d=a(6823),v=a(7010),_=a(2835),p=a(5368),g=a(9999);const C=t=>((0,c.dD)("data-v-94e329b0"),t=t(),(0,c.Cn)(),t),f={class:"order-container"},m={class:"order-product-name"},w={class:"flex-center"},k={class:"price"},b={class:"origin-price"},y={class:"selling-price"},S={class:"order-carts-footer"},h={class:"see-more"},U=["onClick"],Z={class:"add-carts"},P=["onClick"],$={class:"pagination"},x={class:"left-btn"},H=["onClick"],I={class:"right-btn"},z=["textContent"],D={class:"carts-sidebar-cover"},A={class:"carts-header"},T=C((()=>(0,c._)("div",{class:"carts-title",textContent:"Your Carts"},null,-1))),F={class:"close-btn"},M={class:"carts-body"},N={class:"carts-image-container"},O={class:"carts-info"},W={class:"carts-trashcan"},q={class:"carts-title"},Y={class:"carts-qty"},G={class:"carts-price"},K={class:"carts-footer"},j={class:"discount-input"},E={class:"input-code"},Q=["textContent"],V=["textContent"];var B=(0,c.aZ)({__name:"index",setup(t){const e=(0,d.Z)(),a=(0,s.iH)(v.Z),r=(0,s.iH)(!1),C=(0,s.iH)(!1),B=(0,s.iH)(null),J=(0,s.iH)(null),L=(0,s.iH)(""),R=(0,c.Fl)((()=>e.products)),X=(0,c.Fl)((()=>e.cartsItem)),tt=(0,c.Fl)((()=>e.pagination)),et=async t=>{C.value=!0,await e.getProduct(t),a.value.checkProductSwitch=!0,C.value=!1},at=()=>{r.value=!0,n.p8.set(B.value,{x:0,opacity:1}),n.p8.from(B.value,{x:300,duration:.5,opacity:1,ease:"easeInOut"})},ct=()=>{n.p8.to(B.value,{x:300,duration:.5,opacity:0,ease:"easeInOut",onComplete:()=>{r.value=!1,n.p8.from(J.value,{y:-100,duration:1,opacity:1,ease:"back.out"})}})},st=async(t,a)=>{C.value=!0;const c=`${_.Z.API_PATH}/api/${_.Z.CUSTOM_PATH}/cart`,s=await g.Z.post(c,{data:{product_id:t,qty:a}});console.log(s),C.value=!1,e.getCartsItem()},lt=async t=>{C.value=!0;const a=`${_.Z.API_PATH}/api/${_.Z.CUSTOM_PATH}/cart/${t}`,c=await g.Z.delete(a);console.log(c),e.getCartsItem(),C.value=!1},it=async()=>{const t=`${_.Z.API_PATH}/api/${_.Z.CUSTOM_PATH}/coupon`,e=await g.Z.post(t,{data:{code:L.value}});console.log(e),console.log(L.value)},ot=()=>{0!==e.cartsItem.length&&(a.value.userDataSwitch=!0,r.value=!1)};return e.getProducts(),e.getCartsItem(),(t,a)=>((0,c.wg)(),(0,c.iD)("div",f,[(0,c.Wm)((0,s.SU)(u()),{active:C.value,"onUpdate:active":a[0]||(a[0]=t=>C.value=t)},null,8,["active"]),((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(R.value,(t=>((0,c.wg)(),(0,c.iD)("div",{class:"order-carts",key:t.id},[(0,c._)("div",{class:"order-pictures",style:(0,l.j5)({"background-image":`url(${t.imageUrl})`})},null,4),(0,c._)("div",m,[(0,c._)("div",w,(0,l.zw)(t.title),1)]),(0,c._)("div",k,[(0,c._)("div",b,(0,l.zw)((0,s.SU)(p.Z)(t.origin_price)),1),(0,c._)("div",y,(0,l.zw)((0,s.SU)(p.Z)(t.price)),1)]),(0,c._)("div",S,[(0,c._)("div",h,[(0,c._)("button",{onClick:e=>et(t.id)},"See more",8,U)]),(0,c._)("div",Z,[(0,c._)("button",{onClick:e=>st(t.id,1)},"Add to cart",8,P)])])])))),128)),(0,c._)("div",$,[(0,c._)("div",x,[(0,c._)("button",{onClick:a[1]||(a[1]=(0,i.iM)((t=>(0,s.SU)(e).getProducts(tt.value.current_page-1)),["prevent"])),class:(0,l.C_)(["left",{disabled:!tt.value.has_pre}])}," << ",2)]),((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(tt.value.total_pages,((t,a)=>((0,c.wg)(),(0,c.iD)("div",{class:"pages-btn",key:a},[(0,c._)("button",{class:(0,l.C_)([`pages-${t}`,{active:tt.value.current_page===t}]),onClick:(0,i.iM)((a=>(0,s.SU)(e).getProducts(t)),["prevent"])},(0,l.zw)(t),11,H)])))),128)),(0,c._)("div",I,[(0,c._)("button",{onClick:a[2]||(a[2]=(0,i.iM)((t=>(0,s.SU)(e).getProducts(tt.value.current_page+1)),["prevent"])),class:(0,l.C_)(["right",{disabled:!tt.value.has_next}])}," >> ",2)])]),(0,c.wy)((0,c._)("div",{class:"add-carts-icon",onClick:at,ref_key:"cartsIcon",ref:J},[(0,c.Wm)((0,s.SU)(o.GN),{icon:"fa-solid fa-cart-shopping",style:{color:"#fff","font-size":"1.4rem"}}),(0,c._)("div",{class:"add-carts-qty",textContent:(0,l.zw)(`${(0,s.SU)(e).cartsItem.length}`)},null,8,z)],512),[[i.F8,!r.value]]),(0,c.wy)((0,c._)("div",D,[(0,c._)("div",{class:"carts-sidebar-container",ref_key:"carts",ref:B},[(0,c._)("div",A,[T,(0,c._)("div",F,[(0,c.Wm)((0,s.SU)(o.GN),{onClick:ct,icon:"fa-solid fa-xmark"})])]),(0,c._)("div",M,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(X.value,(t=>((0,c.wg)(),(0,c.iD)("div",{class:"carts-item",key:t.id},[(0,c._)("div",N,[(0,c._)("div",{class:"carts-image",style:(0,l.j5)({"background-image":`url(${t.product.imageUrl})`})},null,4)]),(0,c._)("div",O,[(0,c._)("div",W,[(0,c.Wm)((0,s.SU)(o.GN),{onClick:e=>lt(t.id),icon:"fa-regular fa-trash-can"},null,8,["onClick"])]),(0,c._)("div",q,(0,l.zw)(t.product.title),1),(0,c._)("div",Y,(0,l.zw)(`Qty: ${t.qty}`),1),(0,c._)("div",G,(0,l.zw)((0,s.SU)(p.Z)(t.final_total)),1)])])))),128))]),(0,c._)("div",K,[(0,c._)("div",j,[(0,c._)("div",E,[(0,c.wy)((0,c._)("input",{type:"text",placeholder:"Enter your discount code","onUpdate:modelValue":a[3]||(a[3]=t=>L.value=t)},null,512),[[i.nr,L.value]])]),(0,c._)("div",{class:"confirm-btn"},[(0,c._)("button",{onClick:it},"confirm")])]),(0,c._)("div",{class:"subtotal",textContent:(0,l.zw)(`Subtotal: ${(0,s.SU)(p.Z)((0,s.SU)(e).total)}`)},null,8,Q),(0,c._)("div",{class:"discount-price",textContent:(0,l.zw)(`Discount price:  ${(0,s.SU)(p.Z)((0,s.SU)(e).final_total)}`)},null,8,V),(0,c._)("div",{class:"add-btn"},[(0,c._)("button",{onClick:ot},"Proceed to checkout")])])],512)],512),[[i.F8,r.value]])]))}}),J=a(89);const L=(0,J.Z)(B,[["__scopeId","data-v-94e329b0"]]);var R=L}}]);
//# sourceMappingURL=297.17c5ea8e.js.map