import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('spinner-container')}>
            <div className={cx('loading-spinner')}></div>
        </div>
    );
}

export default Loading;
