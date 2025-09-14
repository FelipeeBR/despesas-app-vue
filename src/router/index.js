import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import ExpenseDetail from "@/views/ExpenseDetail.vue";

const routes = [
    { path: "/login", name: "Login", component: LoginPage },
    { 
        path: "/dashboard", 
        name: "Dashboard", 
        component: DashboardPage,
        meta: { requiresAuth: true } 
    },
    { path: "/register", name: "Register", component: RegisterPage },
    { path: "/expense/:id", name: "expense-detail", component: ExpenseDetail, meta: { requiresAuth: true }, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if(to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
