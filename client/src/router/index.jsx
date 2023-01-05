import config from "../config/";
import Home from "../page/Home/Home";
import Category from "../page/Category/Category";
import Order from "../page/Order/Order";
import Product from "../page/Product/Product";
import User from "../page/User/User";
import Login from "../page/Login/Login";
import MainLayout from "../layout/MainLayout/MainLayout";
const router = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routes.category,
        component: Category,
        layout: MainLayout,
    },
    {
        path: config.routes.order,
        component: Order,
        layout: MainLayout,
    },
    {
        path: config.routes.product,
        component: Product,
        layout: MainLayout,
    },
    {
        path: config.routes.user,
        component: User,
        layout: MainLayout,
    },
    // {
    //     path: config.routes.login,
    //     component: Login,
    //     layout: null,
    // },
];
export default router;
