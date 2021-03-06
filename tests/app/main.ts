import '../../src/styles/main.scss';
import '../../src/utils/polyfills';

import Vue from 'vue';
import Router from 'vue-router';

import ComponentsPlugin from '../../src/components';
import DirectivesPlugin from '../../src/directives';
import FiltersPlugin from '../../src/filters';
import FrenchPlugin from '../../src/lang/fr';
import SandboxesPlugin from '../../src/sandbox';
import UtilsPlugin, { UtilsPluginOptions } from '../../src/utils';
import { FRENCH } from '../../src/utils/i18n/i18n';
import DefaultSpritesPlugin from '../../src/utils/svg/default-sprites';
import MetaFactory from './meta-init';
import routerFactory from './router';

Vue.config.productionTip = false;

let utilsOptions: UtilsPluginOptions = {
    i18PluginOptions: {
        curLang: FRENCH
    }
};

Vue.use(UtilsPlugin, utilsOptions);
Vue.use(ComponentsPlugin, { richTextOptions: { key: 'test' } }); // Fake key to avoid error in test pages.
Vue.use(DirectivesPlugin);
Vue.use(SandboxesPlugin);
Vue.use(FiltersPlugin);

Vue.use(FrenchPlugin);
Vue.use(DefaultSpritesPlugin);

MetaFactory();

let router: Router = routerFactory();

const vue: Vue = new Vue({
    router,
    template: '<router-view></router-view>'
});

vue.$mount('#vue');
