import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Alert } from '../components/ui/alert';
import Routes from '../routes';
import store from '../store/storeConfig';

import '../components/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <Provider store={store}>
            <Alert>
                <Routes />
            </Alert>
        </Provider>
    </>,
);
