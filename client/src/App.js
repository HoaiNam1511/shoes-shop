import MainLayout from "./layout/MainLayout/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import router from "./router";
import Login from "./page/Login/Login";
import ToastNotification from "./components/Toast/ToastNotification/ToastNotification";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/login"} element={<Login></Login>}></Route>
                {router.map((route, index) => {
                    let Layout = MainLayout;
                    if (route.layout === null) {
                        Layout = Fragment;
                    } else if (route.layout) {
                        Layout = route.layout;
                    }
                    let Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page></Page>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
