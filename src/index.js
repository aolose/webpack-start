import './styles/index.scss'
import {Provider} from 'mobx-react'
import React from 'react';
import {render} from 'react-dom';
import {NavLink} from 'react-router-dom';
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