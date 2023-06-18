import styles from './Skeleton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Skeleton() {
    return <div class={cx('wrapper')}></div>;
}

export default Skeleton;
