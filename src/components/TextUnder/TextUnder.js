import styles from './TextUnder.module.scss';
import classNames from 'classnames/bind';
import { Underline } from '~/components/Icons';
const cx = classNames.bind(styles);

function TextUnder({ children, className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <p className={classes}>
            {children}
            <Underline className={cx('underline')} />
        </p>
    );
}

export default TextUnder;
