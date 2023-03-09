import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import MenuHeader from './MenuHeader';
import Wrapper from '~/components/Wrapper';
import SubHeader from './SubHeader';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Menu({ items = [], children, hideOnClick = false, visible, setVisible }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentItems = history[history.length - 1];
    const { user } = useSelector((state) => state);
    const renderItems = () => {
        return currentItems.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (!isParent) {
                            setVisible(false);
                        }
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else if (!!item.fn) {
                            const fn = item.fn;
                            fn();
                        } else {
                            // onchange(item)
                        }
                    }}
                ></MenuItem>
            );
        });
    };
    const handleBack = () => {
        setHistory((pre) => pre.slice(0, history.length - 1));
    };

    const handleReset = () => {
        setHistory((pre) => pre.slice(0, 1));
    };

    const renderResult = (attr) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attr}>
                <Wrapper>
                    <MenuHeader name={user.username} aka={user.email} avatar={images.fallbackAvatar} />
                    {history.length > 1 && <SubHeader title={currentItems.title} onBack={handleBack} />}
                    <div className={cx('menu-body')}>{renderItems()}</div>
                </Wrapper>
            </div>
        );
    };
    return (
        <div>
            <Tippy
                visible={visible}
                offset={[12, 20]}
                trigger={'click'}
                delay={[0, 700]}
                placement="bottom-end"
                // animation={true}
                onClickOutside={() => setVisible(false)}
                interactive={true}
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
