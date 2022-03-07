/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index";
import Profile from "./views/examples/Profile.js";
import Category from "./views/Category";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import CategoryDetail from "./views/CategoryDetail";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    listed: true,
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-archive-2 text-primary",
    component: Category,
    listed: true,
  },
  {
    path: "/category/:id",
    name: "Category Detail",
    icon: "ni ni-archive-2 text-primary",
    component: CategoryDetail,
    listed: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    listed: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    listed: true,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    listed: true,
  },
];
export default routes;