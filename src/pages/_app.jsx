import '../../styles/style.css'
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from '../contexts/AuthContext';
import { UsersProvider } from '../contexts/UsersContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <Component {...pageProps} />
      </UsersProvider>
    </AuthProvider>
  )
}

export default MyApp
