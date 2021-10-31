import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { auth } from "./firebase"

export const UserEmailContext = createContext()

const App = () => {
  const [userEmail, setUserEmail] = useState("")
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser.email)
        setUserEmail(authUser.email)
      }
    });
    return () => {
      unSub();
    };
  }, [userEmail]);

  return (
    <UserEmailContext.Provider value={userEmail}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserEmailContext.Provider>
  );
}

export default App;
