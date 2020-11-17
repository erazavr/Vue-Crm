import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import VueMeta from "vue-meta";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";
import Paginate from "vuejs-paginate";

import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";

import tooltipDirective from "@/directives/tooltip.directive";

import Loader from "./components/app/Loader";

import "firebase/auth";
import "firebase/database";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(messagePlugin);
Vue.use(titlePlugin);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);

Vue.directive("tooltip", tooltipDirective);

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyBVqMxq78ddgsFsGXwl-1zGYugblhb0Lmk",
  authDomain: "vue-course-3752f.firebaseapp.com",
  databaseURL: "https://vue-course-3752f.firebaseio.com",
  projectId: "vue-course-3752f",
  storageBucket: "vue-course-3752f.appspot.com",
  messagingSenderId: "161651624808",
  appId: "1:161651624808:web:ca09f0cfec8229658564dd",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
Vue.config.devtools = true;
