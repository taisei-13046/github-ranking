import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
