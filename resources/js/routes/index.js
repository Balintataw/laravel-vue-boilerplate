import Vue    from 'vue';
import Router from 'vue-router';

import Home from '@/js/pages/home.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home, alias: '/home' }
    ]
});

export default router;