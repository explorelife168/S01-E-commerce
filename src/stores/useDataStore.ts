import axios from "axios";
import { defineStore } from "pinia";
import config from "../../config/dev.env";

//回傳的值(product list)設定型別
interface Products<T = number | string> {
  category: string;
  id: string;
  image: string;
  is_enabled: number;
  num: boolean;
  origin_price: T;
  price: T;
  title: string;
  unit: number;
}

type UseDataStore = {
  products: Products[];
};

const useDataStore = defineStore({
  id: "Data",
  state: (): UseDataStore => ({
    products: [],
  }),
  getters: {},
  actions: {
    // 產品畫面更新
    async getProducts() {
      try {
        const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/products`;
        const response = await axios.get(api);
        this.products = response.data.products;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default useDataStore;
