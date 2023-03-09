import classNames from 'classnames/bind';
import styles from './Box.module.scss';

const cx = classNames.bind(styles);
function Box({ title, children, className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <div className={classes}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default Box;
