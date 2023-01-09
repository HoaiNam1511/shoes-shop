import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import ToastNotification from "./components/Toast/ToastNotification/ToastNotification";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <GlobalStyle>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastNotification></ToastNotification>
                <App />
            </PersistGate>
        </Provider>
        <ToastContainer pauseOnFocusLoss={false} limit={3} autoClose={4000} />
    </GlobalStyle>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
