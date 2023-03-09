import classNames from 'classnames/bind';
import styles from './Suggestion.module.scss';
import Image from '../Image';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SuggestItem({ blog }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/blog/${blog?._id}`);
    };
    return (
        <div className={cx('suggest-item')} onClick={handleClick}>
            <Image className={cx('suggest-book')} src={blog?.thumbnail} fallBack={images.fallbackBlog} />
            <p className={cx('suggest-title')}>{blog?.title}</p>
        </div>
    );
}

export default SuggestItem;
