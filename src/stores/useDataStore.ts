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
interface UpdatePagination {
  category: null;
  current_page: number;
  has_next: boolean;
  has_pre: boolean;
  total_pages: number;
}

type UseDataStore = {
  products: UpdateProductsList[];
  pagination: UpdatePagination;
  message: string;
  alertSwitch: boolean;
  stopMessageSwitch: boolean;
  isLoading: boolean;
};

const useDataStore = defineStore({
  id: "Data",
  state: (): UseDataStore => ({
    products: [],
    pagination: {} as UpdatePagination,
    message: "",
    alertSwitch: false,
    stopMessageSwitch: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    // 產品畫面更新
    async getProducts(page = 1) {
      try {
        this.isLoading = true;
        const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/products?page=${page}`;
        const response = await axios.get(api);
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        console.log(response);
        this.isLoading = false;
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
