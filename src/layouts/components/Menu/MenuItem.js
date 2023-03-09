import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, className, onClick, ...props }) {
    const classes = cx('menu-item', {
        separate: data.separate,
        [className]: className,
    });
    return (
        <Button className={classes} props to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
