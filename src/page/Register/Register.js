import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
// import { signInWithGoogle, signInWithFacebook } from '../../auth/firebase';
import { Validator } from '~/helper';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import { authService } from '~/services';
const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [error, setError] = useState(undefined);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: undefined });
    };

    const validator = (state) => {
        let error = {};

        error.username = Validator.isRequire(state.username, 'Vui lòng nhập tên đầy đủ');
        error.password = Validator.isRequire(state.password, 'Vui lòng nhập mật khẩu');
        error.email = Validator.isRequire(state.email, 'Vui lòng nhập email');
        error.passwordConfirm = Validator.isRequire(state.passwordConfirm, 'Vui lòng nhập lại mật khẩu');
        if (!error.username) {
            error.username = Validator.minLength(state.username, 6);
        }

        if (!error.email) {
            error.email = Validator.isEmail(state.email);
        }

        if (!error.password) {
            error.password = Validator.minLength(state.password, 6);
        }
        if (!error.passwordConfirm) {
            error.passwordConfirm = Validator.confirmPassword(
                state.password,
                state.passwordConfirm,
                'Vui lòng nhập chính xác mật khẩu',
            );
        }

        if (!error.username && !error.password && !error.passwordConfirm && !error.password) {
            return true;
        }
        setError(error);
        return false;
    };

    const handleSubmit = (e) => {
        const isValid = validator(state);

        if (isValid) {
            const data = {
                username: state.username,
                email: state.email,
                password: state.password,
            };

            const fetchAPI = async () => {
                const result = await authService.register({ data });
                if (result) {
                    navigate('/login');
                }
            };
            fetchAPI();
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('logo')}>Blog</h2>
                    <Button text to="/login" className={cx('link')}>
                        Login
                    </Button>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>Register</h3>
                    <p className={cx('text')}>
                        By coutinuing, you agree to out <span className={cx('special-text')}>User Agreement</span> and{' '}
                        <span className={cx('special-text')}>Privacy Policy</span>
                    </p>

                    <div className={cx('btn-block')}>
                        <Button outline className={cx('btn')} disabled>
                            Continute with Google
                        </Button>
                        <Button outline className={cx('btn')} disabled>
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
                            type="text"
                            placeholder="Full Name"
                            name="username"
                            value={state.firstname}
                            onChange={handleChange}
                        />
                        {error?.username && <span className={cx('error-mes')}>{error.username}</span>}
                        <input
                            className={cx('input')}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.email}
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

                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password Confirm"
                            name="passwordConfirm"
                            value={state.passwordConfirm}
                            onChange={handleChange}
                        />
                        {error?.passwordConfirm && <span className={cx('error-mes')}>{error.passwordConfirm}</span>}
                    </div>
                </div>
                <Button primary className={cx('btn-submit')} onClick={handleSubmit}>
                    Continute
                </Button>
            </div>
        </div>
    );
}

export default Register;
