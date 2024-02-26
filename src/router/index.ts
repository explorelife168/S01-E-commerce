import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/homepage", // 將首頁重定向到 /homepage
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/models/S01/login/index.vue"),
  },
  {
    path: "/homepage",
    name: "HomePage",
    component: () => import("../components/models/S01/HomePage/index.vue"),
  },
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
      {
        path: "admin_products",
        name: "products",
        component: () => import("../components/global/Products/index.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "admin_order_status",
        name: "orderStatus",
        component: () => import("../components/global/OrderStatus/index.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "admin_coupon",
        name: "coupon",
        component: () => import("../components/global/Coupon/index.vue"),
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
