import React from "react";
import { Header } from "../organisms/Header";
import {CreateRoom} from "../moleclues/CreateRoom"
import {SearchRoom} from "../moleclues/SearchRoom"

export const Room = () => {

  return (
    <div>
      <Header />
	  <SearchRoom />
	  <CreateRoom />
    </div>
  );
};
