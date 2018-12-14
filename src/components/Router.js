import React from "react";
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

export default ({routes: rs = {}, before = '', after = '', root}) => {
    const adapter = (c, i) => {
        const o = rs[c];
        const isCp = typeof  o === 'function';
        return <Route
            key={'r-' + i}
            path={'/' + c}
            component={isCp && o || o.component}
            exact={!isCp && !!o.exact}
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

    return root ? <BrowserRouter>{ch}</BrowserRouter> : ch;
}