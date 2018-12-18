import React from "react";
import {Route, Switch,} from 'react-router';
import {Router , Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {routes as rs, authRoutes} from '../routes';

function auth(p, {token}) {
    return authRoutes.findIndex(c => {
        const tp = typeof c;
        if (tp === 'string') return c === p;
        if (tp === 'function') return c(p);
        if (c instanceof RegExp) return c.test(p)
    }) === -1 || token;
}

export default inject('userStore', 'historyStore')(observer(
    ({historyStore, before = '', after = '', root, userStore}) => {
        const adapter = (c, i) => {
            const Cmp = rs[c];
            const isCp = typeof  Cmp === 'function';
            return <Route
                key={'r-' + i}
                path={'/' + c}
                exact={!isCp && !!Cmp.exact}
                render={props => auth(c, userStore) ?
                    isCp && <Cmp {...props}/> || <Cmp.component {...props}/>
                    : <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}
                    />
                }
            />
        };
        const routes = Object.keys(rs).map(adapter);
        const ch = <div>
            {before}
            <Switch>
                {routes}
            </Switch>
            {after}
        </div>;
        return root ? <Router  history={historyStore}>{ch}</Router> : ch;
    }))