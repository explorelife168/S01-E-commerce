import type { Coupon } from "@/@types";
// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
  createNewCoupon: boolean;
  checkProductSwitch: boolean;
  editProducts: boolean;
  productsId: string;
  editCoupon: boolean;
  couponId: Coupon;
  userDataSwitch: boolean;
};

const modelConfig: ModelConfig = {
  createNewProduct: false, // 新增產品畫面開關   NewProduct > index.vue
  createNewCoupon: false, // 新增優惠券畫面開關
  checkProductSwitch: false, // see more畫面開關
  editProducts: true, // true -> 編輯產品 , false -> 新增產品
  productsId: "", // 確認產品Id edit用
  editCoupon: true,
  couponId: {} as Coupon,
  userDataSwitch: false, // 客戶資訊頁面
};

export default modelConfig;
export { modelConfig };
