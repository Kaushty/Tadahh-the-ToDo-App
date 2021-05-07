import { render } from "react-dom";
import "./styles/rootStyles.css";
import { App } from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
