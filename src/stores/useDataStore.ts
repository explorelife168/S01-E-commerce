import axios from "axios";
import { defineStore } from "pinia";
import config from "../../config/dev.env";

//回傳的值(product list)設定型別
interface UpdateProductsList {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  image: string;
}

type UseDataStore = {
  products: UpdateProductsList[];
  message: string;
  alertSwitch: boolean;
  stopMessageSwitch: boolean;
};

const useDataStore = defineStore({
  id: "Data",
  state: (): UseDataStore => ({
    products: [],
    message: "",
    alertSwitch: false,
    stopMessageSwitch: false,
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
    errorMessage(msg: string) {
      if (this.stopMessageSwitch) return;
      this.message = msg;
      this.alertSwitch = true;
      this.autoCloseMessage();
    },
    autoCloseMessage() {
      setTimeout(() => {
        this.message = "";
        this.alertSwitch = false;
      }, 5000);
    },
  },
});

export default useDataStore;
