import '../../styles/style.css'
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from '../contexts/AuthContext';
import { UsersProvider } from '../contexts/UsersContext';
import { AnimalsProvider } from '../contexts/AnimalsContext';
import { SpeciesProvider } from '../contexts/SpeciesContext';
import { BreedsProvider } from '../contexts/BreedsContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <AnimalsProvider>
          <BreedsProvider>
            <SpeciesProvider>
            <Component {...pageProps} />
            </SpeciesProvider>
          </BreedsProvider>
        </AnimalsProvider>
      </UsersProvider>
    </AuthProvider>
  )
}

export default MyApp
