import './App.css'
import Register from './views/register'
import "primereact/resources/primereact.min.css";                                       

import "primereact/resources/themes/lara-light-indigo/theme.css";     

import 'primeicons/primeicons.css';
        
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

//import Article from './components/article'
//import Like from './components/like'

function App() {
  return (
    <PrimeReactProvider>

      <Register />
      {
      /* <Like width="10pt" height="10pt"/>
      <Like/>
      <Like width="40pt" height="40pt"/> */}

    </PrimeReactProvider>
  )
}

export default App
