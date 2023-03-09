import styles from './Comunicate.module.scss';
import classNames from 'classnames/bind';

import images from '~/assets/images';
const cx = classNames.bind(styles);
function Theme1({ text1, text2 }) {
    return (
        <div className={cx('theme1')}>
            <img className={cx('img')} src={images.theme1} alt="theme1"></img>

            <p className={cx('first')}>{text1}</p>
            <p className={cx('second')}>{text2}</p>
        </div>
    );
}

export default Theme1;
