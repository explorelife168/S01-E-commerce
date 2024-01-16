// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
  checkProductSwitch: boolean;
  editProducts: boolean;
  productsId: string;
};

const modelConfig: ModelConfig = {
  createNewProduct: false, //新增產品畫面開關   NewProduct > index.vue
  checkProductSwitch: false, // see more 按鈕
  editProducts: true, // true -> 編輯產品 , false -> 新增產品
  productsId: "", // 確認產品Id edit用
};

export default modelConfig;
export { modelConfig };
