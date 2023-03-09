import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state);
    const location = useLocation();
    const pathname = location.pathname;
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
        alert('You must login');
        // user is not authenticated
        window.location.href = `/login?continute=${pathname}`;

        return <></>;
    }
    return children;
};
