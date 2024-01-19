// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
  checkProductSwitch: boolean;
  editProducts: boolean;
  productsId: string;
  userDataSwitch: boolean;
  payOrderSwitch: boolean;
};

const modelConfig: ModelConfig = {
  createNewProduct: false, // 新增產品畫面開關   NewProduct > index.vue
  checkProductSwitch: false, // see more畫面開關
  editProducts: true, // true -> 編輯產品 , false -> 新增產品
  productsId: "", // 確認產品Id edit用
  userDataSwitch: false, // 客戶資訊頁面
  payOrderSwitch: false, // 結帳頁面
};

export default modelConfig;
export { modelConfig };
