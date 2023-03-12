import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { memo } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function ShareBox({ menu, onClose }) {
    const renderItem = () => {
        return menu.map((link, index) => {
            const Icon = link.icon;
            const fn = link?.fn;
            return (
                <Button
                    key={index}
                    href={link.to}
                    leftIcon={<Icon />}
                    target="_blank"
                    className={cx('share-btn')}
                    onClick={() => {
                        onClose();

                        if (fn) {
                            fn();
                        }
                    }}
                >
                    {link.title}
                </Button>
            );
        });
    };

    return <div className={cx('dropbox')}>{renderItem()}</div>;
}

export default memo(ShareBox);
