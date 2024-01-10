// 運行模組
export type ModelConfig = {
  createNewProduct: boolean;
  editProducts: boolean;
  productsId: string;
  // newProducts: NewProducts[];
};

// type NewProducts<T = number | string> = {
//   imageUrl: string;
//   title: string;
//   category: string;
//   unit: string;
//   origin_price: T;
//   price: T;
//   description: string;
//   content: string;
//   is_enabled: string;
// };

const modelConfig: ModelConfig = {
  createNewProduct: false, //新增產品畫面開關   NewProduct > index.vue
  editProducts: true, // true -> 編輯產品 , false -> 新增產品
  productsId: "",
  // newProducts: [],
};

export default modelConfig;
export { modelConfig };
