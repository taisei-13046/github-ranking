import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { auth } from "./firebase"

import { Home } from "./components/pages/Home"

export const UserEmailContext = createContext()
export const UserGithubContext = createContext()

const App = () => {
  const [userEmail, setUserEmail] = useState("")
  const [githubId, setGithubId] = useState("")
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUserEmail(authUser.email)
      } else {
        setUserEmail("")
      }
    });
    return () => {
      unSub();
    };
  }, [setUserEmail]);

  return (
    <UserEmailContext.Provider value={{userEmail, setUserEmail}}>
      <UserGithubContext.Provider value={{githubId, setGithubId}}>
        {userEmail ?
          <>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </>
        : (
          <Home />
        )}
      </UserGithubContext.Provider>
    </UserEmailContext.Provider>
  );
}

export default App;
