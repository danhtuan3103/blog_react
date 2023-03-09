import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts';
import { publicRoutes, protectedRoutes } from '~/routes';
import { ProtectedRoutes } from './auth/ProtectedRoutes';
import { useEffect } from 'react';
import { initiateSocketConnection, disconnectSocket, listenSocket } from '~/services/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '~/auth/redux/actions';
import fetchNotifications from './services/fetchNotifications';
import useLocalStorage from 'use-local-storage';

function App() {
    const dispatch = useDispatch();
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    useEffect(() => {
        setTheme('dark');

        fetchNotifications()
            .then((res) => {
                dispatch(getNotifications(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
        initiateSocketConnection();
        listenSocket(dispatch);
        return () => {
            disconnectSocket();
        };
    }, []);
    return (
        <Router>
            <div className="App" data-theme={theme}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        let Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {protectedRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        let Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <ProtectedRoutes>
                                            <Page />
                                        </ProtectedRoutes>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
