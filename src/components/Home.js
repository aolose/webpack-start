import React from "react";
import {inject, observer} from 'mobx-react';
import 'css/home.scss'

function changeName(s) {
    s.name = 'Click ' + Date.now();
}
export default inject('homeStore','userStore')(observer(
    ({homeStore,userStore}) => {
        return <div>
            <h2 className={'y'} onClick={()=>changeName(homeStore)}>
                {homeStore.name}
            </h2>
            {userStore.token?
             <button className={'hBtn'} onClick={userStore.signOut}>Logout</button>:null
            }
        </div>
    })
);