import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Tracker from '@/views/Tracker.vue';
import Bills from '@/components/Bills.vue';
import store from '@/store';

Vue.use(VueRouter);

const thisMonth = new Date().getMonth() + 1;

function setSelectedMonth() {
  if (store.getters['getSelectedMonth'] === 0) {
    store.commit('SET_SELECTED_MONTH', thisMonth);
    return thisMonth;
  }
  return thisMonth;
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: `/${setSelectedMonth() ? setSelectedMonth() : thisMonth}`,
    name: 'Tracker',
    component: Tracker,
    children: [{ path: ':month', components: { bills: Bills } }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
