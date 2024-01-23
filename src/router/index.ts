import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../components/models/S01/Dashboard/index.vue"),
    children: [
      {
        path: "customer_order",
        name: "customerOrder",
        component: () =>
          import("../components/global/CustomerOrders/index.vue"),
      },
      {
        path: "customer_payOrder/:orderId",
        name: "CustomerPayOrder",
        component: () => import("../components/global/PayOrder/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/models/S01/login/index.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/models/S01/Dashboard/index.vue"),
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("../components/global/Products/index.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    //如登入到其他非設定頁面會直接導回login畫面
    path: "/:catchAll(.*)", // router 4.X 需要用此方式，否則會有 340 Uncaught Error
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
