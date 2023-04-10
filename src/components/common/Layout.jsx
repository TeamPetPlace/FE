import React from "react";
import { StLayoutBox } from "./CommonStyle";

function Layout(props) {
  return <StLayoutBox>{props.children}</StLayoutBox>;
}

export default Layout;
