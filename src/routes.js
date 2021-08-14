import Home from './pages/Home.vue';
import Profile from './pages/Profile.vue';
import Todos from './pages/Todos.vue';

export const routes = {
  '/': { name: 'Home', component: Home },
  '/profile': { name: 'Profile', component: Profile },
  '/todos': { name: 'Todos', component: Todos },
};
