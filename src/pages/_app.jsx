import '../../styles/style.css'
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from '../contexts/AuthContext';
import { UsersProvider } from '../contexts/UsersContext';
import { AnimalsProvider } from '../contexts/AnimalsContext';
import { SpeciesProvider } from '../contexts/SpeciesContext';
import { BreedsProvider } from '../contexts/BreedsContext';
import { ServicesProvider } from '../contexts/ServicesContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ServicesProvider>
          <AnimalsProvider>
            <BreedsProvider>
              <SpeciesProvider>
              <Component {...pageProps} />
              </SpeciesProvider>
            </BreedsProvider>
          </AnimalsProvider>
        </ServicesProvider>
      </UsersProvider>
    </AuthProvider>
  )
}

export default MyApp
