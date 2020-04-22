import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './public-path';
import * as serviceWorker from './serviceWorker';

function GitHubTrends(props) {
    const { qianKunProps } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        qianKunProps.onGlobalStateChange(
            (value, prev) => {
                console.log(`[onGlobalStateChange - ${qianKunProps.name}]:`, value, prev);
                setIsLoggedIn(value.isLogin);
            },
            true
        );

        return () => {
            qianKunProps.offGlobalStateChange();
        };
    });

    return isLoggedIn ?
        <iframe className="app-trends-iframe" src="https://hitup.wondertools.top" /> :
        <h1>You need to log in, xie xie.</h1>
}

function render(props) {
    const { container } = props;

    ReactDOM.render(
        <React.StrictMode>
            <GitHubTrends qianKunProps={props} />
        </React.StrictMode>,
        container
            ? container.querySelector('#root')
            : document.querySelector('#root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

export async function mount(props) {
    console.log('[react16] props from main framework', props);
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    const target = container
        ? container.querySelector('#root')
        : document.querySelector('#root');
    target && ReactDOM.unmountComponentAtNode(target);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
