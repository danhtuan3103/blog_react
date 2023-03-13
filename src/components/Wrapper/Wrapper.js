import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ className, children }) {
    const handleClick = (e) => {
        e.stopPropagation();
    };
    return (
        <div className={cx('wrapper', { [className]: className })} onClick={handleClick}>
            {children}
        </div>
    );
}

export default memo(Wrapper);
