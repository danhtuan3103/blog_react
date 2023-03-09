import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import axios from '~/config/axiosConfig';
import { useDispatch } from 'react-redux';
import { login } from '~/auth/redux/actions';

// Import the functions you need from the SDKs you need
const cx = classNames.bind(styles);
function Login() {
    // Get uri to redirect after login
    const [searchParams] = useSearchParams();
    const path = searchParams.get('continute');

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const data = {
            email: state.email,
            password: state.password,
        };
        axios
            .post('/user/login', data)
            .then((response) => {
                const status = response.data.status;

                if (status && status === 'success') {
                    dispatch(
                        login({
                            accessToken: response.data.token.accessToken,
                            refreshToken: response.data.token.refreshToken,
                            data: response.data.data,
                        }),
                    );
                    path ? (window.location.href = path) : (window.location.href = '/');
                }
            })
            .catch(function (error) {
                console.log(error);
                // alert(error.response?.data?.message);
            });
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
                        <Button outline className={cx('btn')}>
                            Continute with Google
                        </Button>
                        <Button outline className={cx('btn')}>
                            Continute with Facebook
                        </Button>
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
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
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
