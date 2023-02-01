import '../../styles/style.css'
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from '../contexts/AuthContext';
import { UsersProvider } from '../contexts/UsersContext';
import { AnimalsProvider } from '../contexts/AnimalsContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <AnimalsProvider>
          <Component {...pageProps} />
        </AnimalsProvider>
      </UsersProvider>
    </AuthProvider>
  )
}

export default MyApp
