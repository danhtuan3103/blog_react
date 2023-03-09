import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
const cx = classNames.bind(styles);
function SubHeader({ title, onBack }) {
    return (
        <div className={cx('sub-header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <IoIosArrowBack />
            </button>
            <h4 className={cx('sub-title')}>{title}</h4>
        </div>
    );
}

export default SubHeader;
