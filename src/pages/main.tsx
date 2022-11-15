import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Alert } from '../components/ui/alert';
import Routes from '../routes';
import store from '../store/storeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../components/global.scss';
import React from 'react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Alert>
                    <Routes />
                </Alert>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
);
