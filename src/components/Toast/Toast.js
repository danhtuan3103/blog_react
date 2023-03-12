import classNames from 'classnames/bind';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Toast.module.scss';
import { deleteToast } from '~/auth/redux/actions';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);
function Toast() {
    const { toasts } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        let timeout;
        if (toasts?.length > 0) {
            timeout = setTimeout(() => {
                dispatch(deleteToast());
            }, 1500);
        }

        return () => clearTimeout(timeout);
    }, [toasts]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {toasts.map((mes, index) => {
                    return (
                        <p key={index} className={cx('toast', { [mes.type]: mes.type })}>
                            {mes.mess}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(Toast);
