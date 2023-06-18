import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { login } from '~/auth/redux/actions';
import { authService } from '~/services';
import { Validator } from '~/helper';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// Import the functions you need from the SDKs you need
const cx = classNames.bind(styles);
function Login() {
    // Get uri to redirect after login
    const [searchParams] = useSearchParams();
    const path = searchParams.get('continute');
    const [error, setError] = useState(undefined);
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const [img, setImg] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        // Khởi tạo Google Sign-In
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
        });
    }, []);

    const handleGoogleSignIn = (response) => {
        // Xử lý phản hồi khi đăng nhập thành công
        const { credential } = response;
        console.log('Access token:', credential);

        // Gửi token về server để xác thực
        // Và thực hiện các thao tác khác sau khi đăng nhập thành công

        const fetchAPI = async () => {
            const result = await authService.signin({ token: credential });
            dispatch(
                login({
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                    data: result.user,
                }),
            );
            path ? (window.location.href = path) : (window.location.href = '/');
        };

        fetchAPI();
    };

    const handleCustomButtonClick = () => {
        window.google.accounts.id.prompt();
    };

    // FABEBOOK

    const responseFacebook = (response) => {
        const { email } = response;

        const fetchAPI = async () => {
            const result = await authService.fbSignin({ data: { email } });

            dispatch(
                login({
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                    data: result.user,
                }),
            );
            path ? (window.location.href = path) : (window.location.href = '/');
        };

        if (!email) {
            alert('Not Found');
        } else {
            fetchAPI();
        }
    };

    const validator = (state) => {
        let error = {};

        error.password = Validator.isRequire(state.password, 'Vui lòng nhập mật khẩu');
        error.email = Validator.isRequire(state.email, 'Vui lòng nhập email');
        if (!error.email) {
            error.email = Validator.isEmail(state.email);
        }

        if (!error.password) {
            error.password = Validator.minLength(state.password, 6);
        }

        if (!error.password && !error.password) {
            return true;
        }
        setError(error);
        return false;
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: undefined });
    };

    const handleSubmit = (e) => {
        const isValid = validator(state);

        if (isValid) {
            const data = {
                email: state.email,
                password: state.password,
            };

            const fetchAPI = async () => {
                const result = await authService.login({ data });
                dispatch(
                    login({
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken,
                        data: result.user,
                    }),
                );
                path ? (window.location.href = path) : (window.location.href = '/');
            };
            fetchAPI();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('logo')}>Blog</h2>
                    <Button text to="/register" className={cx('link')}>
                        Register
                    </Button>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>Login</h3>
                    <p className={cx('text')}>
                        By coutinuing, you agree to out <span className={cx('special-text')}>User Agreement</span> and{' '}
                        <span className={cx('special-text')}>Privacy Policy</span>
                    </p>

                    <div className={cx('btn-block')}>
                        <Button outline className={cx('btn')} onClick={handleCustomButtonClick}>
                            Continute with Google
                        </Button>
                        <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile"
                            // onClick={componentClicked}
                            callback={responseFacebook}
                            render={(renderProps) => (
                                <Button outline className={cx('btn')} onClick={renderProps.onClick}>
                                    Continute with Facebook
                                </Button>
                            )}
                        />
                    </div>

                    <div className={cx('line')}>
                        <span className={cx('line-or')}></span>
                        <span className={cx('or')}>OR</span>
                        <span className={cx('line-or')}></span>
                    </div>

                    <div className={cx('form')}>
                        <input
                            className={cx('input')}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.username}
                            onChange={handleChange}
                        />
                        {error?.email && <span className={cx('error-mes')}>{error.email}</span>}

                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        {error?.password && <span className={cx('error-mes')}>{error.password}</span>}
                    </div>

                    <Button text className={cx('forget')} to="/forget_password">
                        Forget password?
                    </Button>
                </div>
                <Button primary className={cx('btn-submit')} onClick={handleSubmit}>
                    Continute
                </Button>
            </div>
        </div>
    );
}

export default Login;
