import { createApp } from "vue";
import axios from "axios";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// axios.defaults.withCredentials = true; //跨域請求是否攜帶cookie做驗證

library.add(fas, fab, far);
const pinia = createPinia();
const app = createApp(App);

// 頁面驗證使用, 在router設定
router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    const api = "https://vue-course-api.hexschool.io/api/user/check";
    try {
      const res = await axios.post(api);
      if (res.data.success) {
        console.log("main.ts:已登入", res.data);
        next();
      } else {
        console.log("main.ts:尚未登入");
        next({ path: "/login" });
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  } else {
    next();
  }
});

app
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .use(pinia)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
