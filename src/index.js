import React from "react";
import {HashRouter,
  Routes,
  Route,
  // Navigate
} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import PokeInfo from './Routes/PokeInfo';
import Login from "./Components/Login";
import Registro from "./Components/Registro";
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
      
      <HashRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/poke" >
                  <Route path=":pokeName" element={<PokeInfo/>}/>
              </Route> 
              <Route
                  path="*"
                  element={
                      <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                      </main>
                  }
                  replace
              />
          </Routes>
      </HashRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

