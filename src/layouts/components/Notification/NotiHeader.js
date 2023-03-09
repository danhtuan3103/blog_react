import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function NotiHeader({ onClick }) {
    return (
        <header className={cx('header')}>
            <h3 className={cx('title')}>Thông báo</h3>
            <Button small outline yellow className={cx('readed')} onClick={onClick}>
                Đánh dấu đã đọc
            </Button>
        </header>
    );
}

export default NotiHeader;
