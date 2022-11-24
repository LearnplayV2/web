import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routes from '../routes';
import store from '../store/storeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../components/global.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Routes />
            </QueryClientProvider>
        </Provider>
    </>,
);
