import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, className, onClick }) {
    const location = useLocation().pathname;
    const [pathname, setPathname] = useState(location);
    const [isPathname, setIsPathname] = useState(false);

    const findPathname = (link) => {
        if (link === pathname) {
            return true;
        }
        return pathname.includes(link);
    };

    useEffect(() => {
        const isPathname = findPathname(data.to);
        setPathname(location);
        setIsPathname(isPathname);
    });

    const classes = cx('menu-item', {
        separate: data.separate,
        [className]: className,
        active: isPathname,
    });

    return (
        <Button className={classes} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default memo(MenuItem);
