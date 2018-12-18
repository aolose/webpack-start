import './styles/index.scss'
import {Provider} from 'mobx-react'
import React from 'react';
import {render} from 'react-dom';
import {NavLink} from 'react-router-dom';
import * as store from './stores/store';
import Router from './components/Router';

const Nav = () => (
    <div className={'nav'}>
        <NavLink activeClassName='act' exact to='/'>Home</NavLink>
        <NavLink activeClassName='act' to='/sprite'>Sprite</NavLink>
    </div>
);
const App = () => <Provider {...store}>
    <Router before={<Nav/>} root/>
</Provider>;

render(<App/>, document.getElementById('app'));