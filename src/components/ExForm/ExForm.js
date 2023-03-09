import { useEffect, useRef } from 'react';
import { useAutoResize } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './ExForm.module.scss';
import images from '~/assets/images';
import { FiTrash } from 'react-icons/fi';
const cx = classNames.bind(styles);

function ExFrom({ id, value1, value2, handleOnChange, onDelete }) {
    const person1 = useAutoResize(value1);
    const person2 = useAutoResize(value2);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('title')}>Ví dụ bằng cuộc trò chuyện </p>
                <span className={cx('trash')} onClick={() => onDelete(id)}>
                    <FiTrash />
                </span>
            </div>
            <div className={cx('input-block')}>
                <img className={cx('avatar')} src={images.person1} alt="John" />
                <textarea
                    ref={person1}
                    type="text"
                    name="person1"
                    className={cx('input')}
                    value={value1}
                    onChange={(e) => handleOnChange(id, e)}
                />
            </div>
            <div className={cx('input-block')}>
                <img className={cx('avatar')} src={images.person2} alt="Marry" />
                <textarea
                    ref={person2}
                    type="text"
                    name="person2"
                    className={cx('input')}
                    value={value2}
                    onChange={(e) => handleOnChange(id, e)}
                />
            </div>
        </div>
    );
}

export default ExFrom;
