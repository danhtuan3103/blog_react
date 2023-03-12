import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SearchItem({ item }) {
    const navigate = useNavigate();
    const handleClickBlog = () => {
        navigate(`/blog/${item._id}`);
    };
    return (
        <div className={cx('item')} onClick={handleClickBlog}>
            <Image src={item?.thumbnail || ''} className={cx('img')} />
            <div className={cx('info')}>
                <h4 className={cx('item-title')}>{item?.title || ''}</h4>
                <p className={cx('author')}>
                    Created by <strong>{item?.author?.username || ''}</strong>
                </p>
            </div>
        </div>
    );
}

export default SearchItem;
