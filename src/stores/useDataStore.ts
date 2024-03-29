// import axios from "axios";
import { defineStore } from "pinia";
import config from "../../config/dev.env";
import errInterceptors from "@/errInterceptors";

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
  signInCheck: boolean;
};

const useDataStore = defineStore({
  id: "Data",
  state: (): UseDataStore => ({
    products: [],
    product: {} as UpdateProductList,
    cartsItem: [],
    pagination: {
      category: null,
      current_page: 1,
      has_next: false,
      has_pre: false,
      total_pages: 1,
    },
    message: "",
    alertSwitch: false,
    stopMessageSwitch: false,
    isLoading: false,
    final_total: 0,
    total: 0,
    updateCouponList: [],
    couponPagination: {
      category: null,
      current_page: 1,
      has_next: false,
      has_pre: false,
      total_pages: 1,
    },
    signInCheck: false,
  }),
  getters: {
    getLoginStatus(state) {
      return state.signInCheck;
    },
  },
  actions: {
    // 產品畫面更新
    // async getProducts(page = 1) {
    //   try {
    //     this.isLoading = true;
    //     const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/products?page=${page}`;
    //     const response = await axios.get(api);
    //     this.products = response.data.products;
    //     this.pagination = response.data.pagination;
    //     console.log("response:", response);
    //     this.isLoading = false;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // FIXME:
    async getProducts(page = 1) {
      this.isLoading = true;
      const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/products?page=${page}`;
      const response = await errInterceptors.get(api);
      this.products = response.data.products;
      this.pagination = response.data.pagination;
      console.log("response:", response);
      this.isLoading = false;
    },

    async getProduct(id: string) {
      const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/product/${id}`;
      const response = await errInterceptors.get(api);
      this.product = response.data.product;
      // console.log(response);
    },

    async getCartsItem() {
      const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
      const response = await errInterceptors.get(api);
      this.cartsItem = response.data.data.carts;
      this.total = response.data.data.total;
      this.final_total = response.data.data.final_total;
      // console.log(response);
      // console.log(this.cartsItem);
    },

    // async checkSingIn() {
    //   const api = `${config.API_PATH}/api/user/check`;
    //   const response = await errInterceptors.post(api);
    //   if (response.data.success) {
    //     this.signInCheck = true;
    //     console.log("登入狀態為(pinia):", response.data.success);
    //   } else {
    //     this.signInCheck = false;
    //     console.log("登入狀態為(pinia):", response.data.success);
    //   }
    // },

    async getCouponList(page = 1) {
      const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupons?page=${page}`;
      const response = await errInterceptors.get(api);
      this.updateCouponList = response.data.coupons;
      this.couponPagination = response.data.pagination;
      // console.log(response);
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

    actionLoginStatus() {
      this.signInCheck = !this.signInCheck;
    },
  },
  // actions: {
  //   // 產品畫面更新
  //   async getProducts(page = 1) {
  //     try {
  //       this.isLoading = true;
  //       const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/products?page=${page}`;
  //       const response = await axios.get(api);
  //       this.products = response.data.products;
  //       this.pagination = response.data.pagination;
  //       console.log(response);
  //       this.isLoading = false;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  //   async getProduct(id: string) {
  //     try {
  //       const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/product/${id}`;
  //       const response = await axios.get(api);
  //       this.product = response.data.product;
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  //   async getCartsItem() {
  //     try {
  //       const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
  //       const response = await axios.get(api);
  //       this.cartsItem = response.data.data.carts;
  //       this.total = response.data.data.total;
  //       this.final_total = response.data.data.final_total;
  //       console.log(response);
  //       console.log(this.cartsItem);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   async checkSingIn() {
  //     const api = `${config.API_PATH}/api/user/check`;
  //     try {
  //       const response = await axios.post(api);
  //       if (response.data.success) {
  //         this.signInCheck = true;
  //       } else {
  //         this.signInCheck = false;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },

  //   async getCouponList(page = 1) {
  //     try {
  //       const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupons?page=${page}`;
  //       const response = await axios.get(api);
  //       this.updateCouponList = response.data.coupons;
  //       this.couponPagination = response.data.pagination;
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },

  //   errorMessage(msg: string) {
  //     if (this.stopMessageSwitch) return;
  //     this.message = msg;
  //     this.alertSwitch = true;
  //     this.autoCloseMessage();
  //   },

  //   autoCloseMessage() {
  //     setTimeout(() => {
  //       this.message = "";
  //       this.alertSwitch = false;
  //     }, 5000);
  //   },
  // },
});

export default useDataStore;
