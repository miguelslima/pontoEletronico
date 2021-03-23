import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
  --white: #fff;
  --background: #f2f3f5;
  --gray-line: #dcdde0;
  --text: #aaa;
  --text-highlight: #b3b9ff;
  --title: #2e384d;
  --red: #e83f5b;
  --green: #4cd62b;
  --blue: #5965e0;
  --blue-dark: #4953b8;
  --blue-twitter: #2aa9e0;

  --primary-dark-color: #212121;
  --primary-color: #424242;
  --accent-color: #e50914;
  --text-color: #e0e0e0;
  --input-color: #e0e0e0;
  --title-color: #f5f5f5;
  --link-color: #f5f5f5;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  
  background: var(--primary-dark-color);
  color: var(--blue);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  font-family: 'Roboto', sans-serif;
  transition: all 0.25s linear;
}

html {
  height: 100%;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  opacity: 0.8;
}

body,
input,
textarea,
button {
  font: 400 1rem 'Roboto', sans-serif;
  outline: none;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

`;
