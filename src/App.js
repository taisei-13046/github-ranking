import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { auth } from "./firebase"

import { Home } from "./components/pages/Home"

export const UserEmailContext = createContext()
export const UserGithubContext = createContext()
export const RoomInfoContext = createContext()

const App = () => {
  const [userEmail, setUserEmail] = useState("")
  const [githubId, setGithubId] = useState("")
  const [roomInfo, setRoomInfo] = useState({})
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserEmail(authUser.email)
      }
    });
    return () => {
      unSub();
    };
  }, [setUserEmail]);

  return (
    <RoomInfoContext.Provider value={{roomInfo, setRoomInfo}}>
      <UserEmailContext.Provider value={{userEmail, setUserEmail}}>
        <UserGithubContext.Provider value={{githubId, setGithubId}}>
          {userEmail && flag ?
            <>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </>
          : (
            <Home flag={flag} setFlag={setFlag} />
          )}
        </UserGithubContext.Provider>
      </UserEmailContext.Provider>
    </RoomInfoContext.Provider>
  );
}

export default App;
