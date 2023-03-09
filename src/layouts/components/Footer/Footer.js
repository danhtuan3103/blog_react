import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const MENU = [
    {
        id: 1,
        title: 'Giới thiệu',
        item: ['Giới thiệu về Language', 'Tuyển dụng', ' Quảng cáo', 'Tin tức', 'Tải úng dụng'],
    },
    {
        id: 2,
        title: 'Dành cho học sinh',
        item: ['Thẻ ghi nhớ', 'Học', 'Lời giải', 'Quizz'],
    },
    {
        id: 3,
        title: 'Giới thiệu',
        item: ['Giới thiệu về Language', 'Tuyển dụng', ' Quảng cáo', 'Tin tức', 'Tải úng dụng'],
    },
    {
        id: 4,
        title: 'Dành cho học sinh',
        item: ['Thẻ ghi nhớ', 'Học', 'Lời giải', 'Quizz'],
    },
    {
        id: 5,
        title: 'Ngôn ngữ',
        item: ['Tiếng Việt'],
    },
];
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('menu')}>
                {MENU.map((menu, index) => {
                    return (
                        <div className={cx('menu-list')} key={menu.id}>
                            <h4 className={cx('title')}>{menu.title}</h4>
                            {menu.item.length > 0 ? (
                                menu.item.map((item, index) => {
                                    return (
                                        <p className={cx('menu-item')} key={index}>
                                            {item}
                                        </p>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    );
                })}
            </div>
        </footer>
    );
}

export default Footer;
