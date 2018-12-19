import Home from './components/Home';
import Sprite from './components/Sprite';
import Login from './components/Login';
export const authRoutes = [
    '',
];
export const routes  = {
    '': {
        component:Home,
        exact:1
    },
    'sprite': Sprite,
    'login': Login,
};
