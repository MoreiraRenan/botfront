const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/Login.vue"),
  },
  {
    path: "/conf",
    name: "conf",
    component: () => import("layouts/Conf.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
