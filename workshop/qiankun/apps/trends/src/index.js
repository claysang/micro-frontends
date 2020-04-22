import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './public-path';
import * as serviceWorker from './serviceWorker';

let isLoggedIn = false;

const GitHubTrends = ({ isLoggedIn }) => {
    return isLoggedIn ?
        <iframe className="app-trends-iframe" src="https://hitup.wondertools.top" /> :
        <h1>You need to log in, xie xie.</h1>
}

function render(props) {
    const { container } = props;

    ReactDOM.render(
        <React.StrictMode>
            <GitHubTrends isLoggedIn={isLoggedIn} />
        </React.StrictMode>,
        container
            ? container.querySelector('#root')
            : document.querySelector('#root')
    );
}

function subscribeState(props) {
    props.onGlobalStateChange(
        (value, prev) => {
            console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev);
            isLoggedIn = value.isLogin;
            render(props);
        },
        true
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
    subscribeState(props);
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
