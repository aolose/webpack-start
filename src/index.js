import './styles/index.scss'
import {Provider} from 'inferno-mobx'
import {render, Component} from 'inferno';
import {NavLink} from 'inferno-router';
import routes from './routes';
import store from './stores/store';
import Router from './components/Router';

const Nav = () => (
    <div className={'nav'}>
        <NavLink activeClassName='act' exact to='/'>Home</NavLink>
        <NavLink activeClassName='act' to='/out'>Out</NavLink>
    </div>
);
const App = () => <Provider rootStore={store}>
    <Router before={<Nav/>} routes={routes} root/>
</Provider>;

render(<App/>, document.getElementById('app'));