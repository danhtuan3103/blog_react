import { useAutoResize } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './ExForm.module.scss';
import { FiTrash } from 'react-icons/fi';
import { memo } from 'react';
const cx = classNames.bind(styles);
function ExFrom1({ id, value, handleOnChange, onDelete }) {
    const textRef = useAutoResize(value);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('title')}>Ví dụ bằng cuộc 1 câu đơn giản hoặc 1 văn bản </p>
                <span className={cx('trash')} onClick={() => onDelete(id)}>
                    <FiTrash />
                </span>
            </div>
            <div className={cx('input-block')}>
                <textarea
                    ref={textRef}
                    type="text"
                    name="text"
                    className={cx('input')}
                    value={value}
                    onChange={(e) => handleOnChange(id, e)}
                />
            </div>
        </div>
    );
}

export default memo(ExFrom1);
