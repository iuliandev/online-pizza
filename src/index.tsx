
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./redux/store";
const rootElem = document.getElementById('root');
// const root = ReactDOM.createRoot(document.getElementById("root"));
if(rootElem){
  const root = ReactDOM.createRoot(rootElem)
  root.render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
  );
}

