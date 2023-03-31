import React from "react";
import styled from "styled-components";

function Layout(props) {
  return <LayoutBox>{props.children}</LayoutBox>;
}

export default Layout;

const LayoutBox = styled.div`
  width: 1920px;
  overflow: hidden;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
`;
