import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddNew from "../views/AddNew.vue";
import ActiveLists from "../views/ActiveLists.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // props: true,
    },
    {
        path: "/AddNew",
        name: "AddNew",
        component: AddNew,
        // props: true,
    },
    {
        path: "/ActiveLists",
        name: "ActiveLists",
        component: ActiveLists,
        // props: true,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
