import {observable} from 'mobx';
import { createHashHistory } from 'history';

export const homeStore = observable({
    name:'Click to change',
});
export const outStore = observable({
  value:100
});

export  const historyStore = createHashHistory({});

export const userStore = observable({
    value:100,
    token:"",
    loginTime:"",
    signOut(){
        userStore.token="";
        historyStore.replace("/")
    }
});