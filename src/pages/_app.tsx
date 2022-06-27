import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/globals.css';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
