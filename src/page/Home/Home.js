import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import useTitle from '~/hooks/useTitle';
import SlideShow from '~/components/SlideShow';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Home() {
    useTitle('Home');
    const navigate = useNavigate();
    const { user } = useSelector((state) => state);

    useEffect(() => {
        if (user.avatar === '') {
            navigate('/avatar/select');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <SlideShow />
            </div>
        </div>
    );
}

export default Home;
