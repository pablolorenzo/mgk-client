import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./auth/authenticate";

Vue.use(Router);

// create new router

const routes = [
  {
    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    //beforeEnter: authenticate,
   // redirect: "/app/pages/blank",
   redirect: "/app/sessions/signIn",
   
    meta: {
      requiresAuth: true,
      is_admin : true
  },
    children: [
     

   
      // pages
      {
        path: "/app/pages",
        component: () => import("./views/app/pages"),
        redirect: "/app/pages/profile",
        children: [
          {
            path: "profile",
            component: () => import("./views/app/pages/profile")
          },
          {
            path: "error",
            component: () => import("./views/app/pages/notFound")
          },
          {
            path: "icons",
            component: () => import("./views/app/pages/icons")
          },
          {
            path: "search-result",
            component: () => import("./views/app/pages/search-result")
          },
          {
            path: "pricing-table",
            component: () => import("./views/app/pages/pricingTable")
          },
          {
            path: "faq",
            component: () => import("./views/app/pages/faq")
          },
          {
            path: "blank",
            component: () => import("./views/app/pages/blank")
          },
          
        ]
      },

    

    
    ]
  },
  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/app/sessions"),
    redirect: "/app/sessions/signIn",
    children: [
      {
        path: "signIn",
        component: () => import("./views/app/sessions/signIn")
      }
    ]
  },


  {
    path: "*",
    component: () => import("./views/app/pages/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});


router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
 console.log("cheking the login")
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  console.log(localStorage)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(localStorage)
    if (localStorage.getItem('t')) {
      console.log("#######################");
      console.log("#######################");
      console.log("#######################");
      console.log("#######################");
      console.log("#######################");
      console.log("#######################");
      console.log(to);
      next();
    } else {
      next({
        path: '/app/sessions/signIn'
      })
    }
  } else {
    if(to.path == '/app/sessions/signIn' && localStorage.getItem('t')) {
      next({
        path: '/app/pages/blank'
      })
    } else {
      next()
    }
     // make sure to always call next()!
  }
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
