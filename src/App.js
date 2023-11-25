import './App.css';
import { useState } from 'react';

import SideMenu from './Components/SideMenu/SideMenu';
import TopMenu from './Components/TopMenu/TopMenu';

import Routes from './Routes/AllRoutes';
import NavContext from "./Context/NavContext";
import LoginModal from './Components/LoginModal/LoginModal';

function App() {
  const [menu, setMenu] = useState(false);
  const value = { menu, setMenu };

  return (
    <div className="App">
      <NavContext.Provider value={value}>
        <LoginModal />
        <SideMenu />
        <main className="container">
          <TopMenu />
          <Routes />
        </main>
      </NavContext.Provider>
    </div>
  );
}

export default App;
