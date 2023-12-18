import { createApp } from "vue";
import axios, { AxiosResponse } from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

axios.defaults.withCredentials = true;
createApp(App).use(VueAxios, axios).use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {
  console.log(to);
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
