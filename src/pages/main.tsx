import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Alert } from '../components/ui/alert';
import Routes from '../routes';
import store from '../store/storeConfig';

import './global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Alert>
                <Routes />
            </Alert>
        </Provider>
    </React.StrictMode>,
);
