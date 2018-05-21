/**
 * @file entry
 * @author zuowenqi(qqw78901@126.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Vuetify from 'vuetify';
Vue.use(Meta);

Vue.use(Vuetify);


import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

const OSS = require("ali-oss");
const client = new OSS({
  region: "oss-cn-qingdao",
//   accessKeyId: "LTAITRn02JuELbOV",
  accessKeyId: "LTAI002n4stCzQMS",
  accessKeySecret: "UUJTdqn8FItT9caqqjkVEVgPAZ2o2L",
//   accessKeySecret: "1jA02SbMLJFJmnncCJaYri6AeHe1tY",
  bucket: "gdutzuo1"
});
Vue.prototype.$client = client;
Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
