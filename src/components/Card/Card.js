import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, memo, useCallback } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { FaCommentAlt } from 'react-icons/fa';
import { AiFillLike, AiFillEye } from 'react-icons/ai';
import CardHeader from './CardHeader';
import { sendNotification } from '~/services/socket';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToast } from '~/auth/redux/actions';
import { bookmarkService } from '~/services';
import { handleAuth } from '~/helper';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Card({ className, blog }) {
    const classes = cx('wrapper', { [className]: className });
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state);
    const href = useLocation().pathname;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await bookmarkService.checkBookmark({ blog_id: blog._id });
            setIsBookmarked(result?.isBookmarked);
        };

        handleAuth({ isAuthenticated, authHandle: fetchAPI });
    }, []);

    const handleClick = useCallback(
        (e) => {
            navigate(`/blog/${blog._id}`, {});
        },
        [blog?._id],
    );

    const handleClickShare = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
        },
        [blog?._id],
    );

    const handleClickUser = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/profile/${blog?.author?._id}`, { replace: true });
        },
        [blog?._id],
    );

    const handleClickBookmark = useCallback(
        (e) => {
            e.stopPropagation();
            const fetchAPI = async () => {
                const result = await bookmarkService.bookmarkBlog({ blog_id: blog?._id });
                setIsBookmarked(result.isBookmarked);
                if (isBookmarked) {
                    dispatch(addToast({ type: 'toast-info', mess: 'Xóa vào mục đã lưu' }));
                } else {
                    dispatch(addToast({ type: 'toast-info', mess: 'Thêm vào mục đã lưu' }));
                }
                if (user?._id !== blog?.author?._id) {
                    sendNotification({
                        notification: {
                            type: isBookmarked ? 'UN_STORE' : 'STORE',
                            receiver: blog?.author._id,
                            sender: user?._id,
                            target: blog?._id,
                        },
                    });
                }
            };

            handleAuth({ isAuthenticated, authHandle: fetchAPI, path: href });
        },
        [isBookmarked, blog?._id],
    );

    return (
        <div className={classes} onClick={handleClick}>
            <CardHeader
                isBookmarked={isBookmarked}
                avatar={blog?.author?.avatar}
                author={blog?.author?.username}
                blogId={blog._id}
                onClickUser={handleClickUser}
                onClickBookMark={handleClickBookmark}
                onClickShare={handleClickShare}
            />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{blog?.title}</h2>
                    <p className={cx('description')}>{blog?.content}</p>

                    <div className={cx('statistical')}>
                        <span className={cx('number')}>
                            <AiFillLike className={cx('icon')} />
                            {blog?.like?.count}
                        </span>
                        <span className={cx('number')}>
                            <FaCommentAlt className={cx('icon')} />
                            {blog?.comment?.count}
                        </span>
                    </div>
                </div>
                {blog?.thumbnail && <Image className={cx('blog-img')} src={blog?.thumbnail} alt="image" />}
            </div>
        </div>
    );
}

export default memo(Card);
