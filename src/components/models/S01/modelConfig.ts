// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
  editProducts: boolean;
  productsId: string;
};

const modelConfig: ModelConfig = {
  createNewProduct: false, //新增產品畫面開關   NewProduct > index.vue
  editProducts: true, // true -> 編輯產品 , false -> 新增產品
  productsId: "",
};

export default modelConfig;
export { modelConfig };
