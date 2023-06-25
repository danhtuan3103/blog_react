import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts';
import { publicRoutes, protectedRoutes } from '~/routes';
import { ProtectedRoutes } from './auth/ProtectedRoutes';
import { useEffect } from 'react';
import { initiateSocketConnection, disconnectSocket, listenSocket } from '~/services/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '~/auth/redux/actions';
import * as notificationService from './services/notificationService';
import { handleAuth } from './helper';
import { Suspense } from 'react';
import Loading from './components/Loading/Loading';
function App() {
    const dispatch = useDispatch();
    const { theme, isAuthenticated } = useSelector((state) => state);
    useEffect(() => {
        initiateSocketConnection();
        listenSocket(dispatch);
        return () => {
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await notificationService.getNotifications();
            dispatch(getNotifications(result));
        };

        handleAuth({ isAuthenticated, authHandle: fetchAPI });
    }, [isAuthenticated]);

    useEffect(() => {
        if (window.location.hash === '#_=_') {
            window.location.hash = '';
        }
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
                                        <Suspense fallback={<Loading />}>
                                            <Page />
                                        </Suspense>
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
