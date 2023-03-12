import classNames from 'classnames/bind';
import styles from './SearchDetail.module.scss';
import Image from '~/components/Image';
import { memo } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/blog/${blog._id}`);
    };
    return (
        <div className={cx('card1')}>
            {blog?.thumbnail && <Image onClick={handleClick} className={cx('img')} src={blog?.thumbnail}></Image>}
            <h4 className={cx('title')} onClick={handleClick}>
                {blog?.title}
            </h4>
            <span className={cx('continute')} onClick={handleClick}>
                Đọc tiếp...
            </span>
            <div className={cx('numbers')}>
                <span className={cx('like')}>
                    <RiHeart3Fill className={cx('icon')}></RiHeart3Fill>
                    {blog?.like?.count}
                </span>
                <span className={cx('comments')}>{blog?.comment?.count} bình luận</span>
            </div>
        </div>
    );
};

export default memo(BlogCard);
