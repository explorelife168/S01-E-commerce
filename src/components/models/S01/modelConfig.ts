// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
};

const modelConfig: ModelConfig = {
  createNewProduct: false, //新增產品畫面開關   NewProduct > index.vue
};

export default modelConfig;
export { modelConfig };
