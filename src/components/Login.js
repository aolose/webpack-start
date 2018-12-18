import React from "react";
import {inject, observer} from 'mobx-react';
import {userStore} from "../stores/store";
import {Redirect} from 'react-router'
import 'css/login.scss'

function handleSubmit(e, s) {
    const [{value: user}, {value: pwd}] = e.target.querySelectorAll('input');
    if (user && pwd) {
        console.log(user, pwd);
        s.token = [user, pwd].join('_');
    }
}

export default inject('userStore')(observer(
    ({location, userStore: {token}}) => {
        if (token) {
            const {state: {from = {pathname: "/"}} = {}} = location;
            return <Redirect to={from}/>;
        } else return <div>
            <h5 style={{marginLeft: 20}}>Input anything</h5>
            <form onSubmit={e => handleSubmit(e, userStore)}>
                <label>
                    UserName
                    <input type={'text'} placeholder={'Username'}/>
                </label>
                <label>
                    Password
                    <input type={'password'} placeholder={'Password'}/>
                </label>
                <input type={'submit'} value="Submit"/>
            </form>
        </div>
    })
);