import './bootstrap';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate'

// Route interface for Vue Router
import Routes from '@/js/routes';

// Component File app entry point
import App from '@/js/views/App';

Vue.use(VeeValidate);
Vue.use(Vuetify, {
    theme: {
        primary: '#607d8b',
        secondary: '#3f51b5',
        accent: '#03a9f4',
        error: '#f44336',
        warning: '#ffc107',
        info: '#00bcd4',
        success: '#4caf50'
    }
});

const app = new Vue({
    el: '#app',
    router: Routes,
    render: h => h(App),
});

export default app;
