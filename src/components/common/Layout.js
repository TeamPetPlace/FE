import React from "react";
import styled from "styled-components";

function Layout(props) {
  return <LayoutBox>{props.children}</LayoutBox>;
}

export default Layout;

const LayoutBox = styled.div`
  width: 100%;
`;
