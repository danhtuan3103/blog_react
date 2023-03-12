const handleAuth = ({ isAuthenticated, authHandle, path }) => {
    if (isAuthenticated) {
        authHandle();
    } else {
        if (path) {
            window.location.href = `/login?continute=${path}`;
            return;
        } else {
            return;
        }
    }
};

export default handleAuth;
