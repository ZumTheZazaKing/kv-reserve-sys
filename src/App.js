import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense as Sus, lazy, useState, useMemo } from "react";
import { Context } from "./context";

const Login = lazy(()=>import('./pages/Login').then(module => ({default:module.Login})))
const UserMain = lazy(()=>import('./pages/UserMain').then(module => ({default:module.UserMain})))
const UserTable = lazy(()=>import('./pages/UserTable').then(module => ({default:module.UserTable})))

function App() {

  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn'))||false)

  const memo = useMemo(()=>({
    loggedIn:loggedIn,
    setLoggedIn:setLoggedIn
  }),[loggedIn, setLoggedIn])

  return (
    <HashRouter>
      <div className="App">
        <Sus fallback={<div className="flex justify-center items-center text-3xl font-bold h-screen">Loading...</div>}>
          <Context.Provider value={memo}>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/user' element={<UserMain/>}/>
              <Route path='/usertable' element={<UserTable/>}/>
            </Routes>
          </Context.Provider>
        </Sus>
      </div>
    </HashRouter>
  );
}

export default App;
