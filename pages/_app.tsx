import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
       />
    </>
  )
}
