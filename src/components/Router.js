import {Route, Switch, BrowserRouter} from 'inferno-router';

export default ({routes: rs = {}, before = '', after = '', root}) => {
    const adapter = c => {
        const o = rs[c];
        const isCp = typeof  o === 'function';
        return <Route
            path={'/' + c}
            component={isCp && o || o.component}
            exact={!isCp && o.exact}
        />
    };
    const routes = Object.keys(rs).map(adapter);
    const ch = [
        before,
        <Switch>
            {routes}
        </Switch>,
        after
    ];

    return root ? <BrowserRouter>{ch}</BrowserRouter> : <div>{ch}</div>;
}