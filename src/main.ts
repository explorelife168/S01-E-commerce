import { createApp } from "vue";
import axios, { AxiosResponse } from "axios";
import { createPinia } from "pinia";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

axios.defaults.withCredentials = true; //跨域請求是否攜帶cookie做驗證

const pinia = createPinia();
const app = createApp(App);

app.use(VueAxios, axios).use(store).use(router).use(pinia).mount("#app");

//頁面驗證使用, 在router設定
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const api = "https://vue-course-api.hexschool.io/api/user/check";
    axios.post(api).then((res: AxiosResponse) => {
      if (res.data.success) {
        next();
      } else {
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});
