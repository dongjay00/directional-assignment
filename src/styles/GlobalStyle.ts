"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    font-family: "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    background-color: #f5f5f7;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #101114;
    background: #f5f5f7;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
