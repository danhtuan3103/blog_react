import styles from './Comunicate.module.scss';
import classNames from 'classnames/bind';

import images from '~/assets/images';

const cx = classNames.bind(styles);
function Theme2() {
    return (
        <div className={cx('theme2')}>
            <div className={cx('person')}>
                <img className={cx('avatar')} src={images.person1} />
                <p className={cx('text')}> Hello !</p>
            </div>

            <div className={cx('person')}>
                <img className={cx('avatar')} src={images.person2} />
                <p className={cx('text')}>
                    {' '}
                    Chao Ban Line 11:17: img elements must have an alt prop, either with meaningful text, or an empty
                    string for decorative images jsx-a11y/alt-text Line 16:17: img elements must have an alt prop,
                    either with meaningful text, or an empty string for decorative images jsx-a11y/alt-text
                </p>
            </div>
        </div>
    );
}

export default Theme2;
