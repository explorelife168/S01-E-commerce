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

interface UpdateProductList {
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

interface updateCartsItem {
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

interface updateCartsAllItems {
  final_total: number;
  id: string;
  product: updateCartsItem;
  product_id: string;
  qty: number;
  total: number;
}

type UpdateCouponList = {
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  code: string;
  id: string;
  num: number;
};
type CouponPagination = {
  category: null;
  current_page: number;
  has_next: boolean;
  has_pre: boolean;
  total_pages: number;
};

type UseDataStore = {
  products: UpdateProductsList[];
  product: UpdateProductList;
  cartsItem: updateCartsAllItems[];
  pagination: UpdatePagination;
  message: string;
  alertSwitch: boolean;
  stopMessageSwitch: boolean;
  isLoading: boolean;
  final_total: number;
  total: number;
  updateCouponList: UpdateCouponList[];
  couponPagination: CouponPagination;
};

const useDataStore = defineStore({
  id: "Data",
  state: (): UseDataStore => ({
    products: [],
    product: {} as UpdateProductList,
    cartsItem: [],
    pagination: {} as UpdatePagination,
    message: "",
    alertSwitch: false,
    stopMessageSwitch: false,
    isLoading: false,
    final_total: 0,
    total: 0,
    updateCouponList: [],
    couponPagination: {} as CouponPagination,
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

    async getProduct(id: string) {
      try {
        const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/product/${id}`;
        const response = await axios.get(api);
        this.product = response.data.product;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },

    async getCartsItem() {
      try {
        const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
        const response = await axios.get(api);
        this.cartsItem = response.data.data.carts;
        this.total = response.data.data.total;
        this.final_total = response.data.data.final_total;
        console.log(response);
        console.log(this.cartsItem);
      } catch (error) {
        console.error(error);
      }
    },

    async getCouponList(page = 1) {
      try {
        const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupons?page=${page}`;
        const response = await axios.get(api);
        this.updateCouponList = response.data.coupons;
        this.couponPagination = response.data.pagination;
        console.log(response);
      } catch (error) {
        console.log(error);
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
