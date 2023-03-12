import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './Error.module.scss';

const cx = classNames.bind(styles);
function FeedbackList() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <div className={cx('wrapper')}>
            <span className={cx('error')}>404</span>
            <Button className={cx('btn')} large text onClick={handleClick}>
                Quay lại
            </Button>
        </div>
    );
}

export default FeedbackList;
