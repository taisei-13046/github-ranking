import { memo } from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "../components/pages/Home";
import { Room } from "../components/pages/Room";
import { Ranking } from "../components/pages/Ranking";

export const Router = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/room">
        <Room />
      </Route>
      <Route path="/ranking">
        <Ranking />
      </Route>
    </Switch>
  );
});
