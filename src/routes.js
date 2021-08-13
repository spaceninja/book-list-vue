import Home from './pages/Home.vue';
import Profile from './pages/Profile.vue';

export const routes = {
  '/': { name: 'Home', component: Home },
  '/profile': { name: 'Profile', component: Profile },
};
