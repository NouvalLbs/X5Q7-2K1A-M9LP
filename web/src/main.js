// Import the createApp function from Vue library
import { createApp } from 'vue'
import { createPinia } from 'pinia';

// Import the CSS file for our app's styling
import './style.css'

// Import the root component for our app
import App from './App.vue'

// Import Router
import router from './router/index.js'

// Create a new Vue app instance and mount it to the #app element in our HTML
const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');
