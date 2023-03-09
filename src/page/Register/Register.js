import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
// import { signInWithGoogle, signInWithFacebook } from '../../auth/firebase';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import instance from '~/config/axiosConfig';
const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        if (state.password === state.passwordConfirm) {
            const data = {
                username: state.username,
                email: state.email,
                password: state.password,
            };

            instance
                .post('/user/register', data)
                .then(function (response) {
                    const status = response.data.status;
                    if (status && status === 'success') {
                        alert('Successfully');
                        navigate('/login');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error.response.data.message);
                });
        } else {
            alert('Password is incorrect');
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
                            type="text"
                            placeholder="Full Name"
                            name="username"
                            value={state.firstname}
                            onChange={handleChange}
                        />
                        <input
                            className={cx('input')}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.email}
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
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password Confirm"
                            name="passwordConfirm"
                            value={state.passwordConfirm}
                            onChange={handleChange}
                        />
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
