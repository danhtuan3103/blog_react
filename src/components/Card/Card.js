import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FaCommentAlt } from 'react-icons/fa';

import Image from '~/components/Image';
import { AiFillLike, AiFillEye } from 'react-icons/ai';

import CardHeader from './CardHeader';
import instance from '~/config/axiosConfig';
import { sendNotification } from '~/services/socket';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Card({ className, blog }) {
    const classes = cx('wrapper', { [className]: className });
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { user } = useSelector((state) => state);

    const navigate = useNavigate();

    useEffect(() => {
        instance
            .get(`/bookmark/check/${blog._id}`)
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    setIsBookmarked(data.isBookmarked);
                } else {
                    alert('Sorry , somthing was wrong');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClick = (e) => {
        navigate(`/blog/${blog._id}`, {});
    };

    const handleClickBookmark = (e) => {
        e.stopPropagation();
        instance
            .post(`/bookmark/${blog._id}`)
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    setIsBookmarked(data.isBookmarked);
                    sendNotification({
                        notification: {
                            type: isBookmarked ? 'UN_STORE' : 'STORE',
                            receiver: blog.author._id,
                            sender: user._id,
                            target: blog._id,
                        },
                    });
                } else {
                    alert('Sorry , somthing was wrong');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClickShare = (e) => {
        e.stopPropagation();
    };

    const handleClickUser = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${blog.author._id}`, { replace: true });
    };

    return (
        <div className={classes} onClick={handleClick}>
            <CardHeader
                isBookmarked={isBookmarked}
                avatar={blog.author?.avatar}
                author={blog.author?.username}
                onClickUser={handleClickUser}
                onClickBookMark={handleClickBookmark}
                onClickShare={handleClickShare}
            />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{blog.title}</h2>
                    <p className={cx('description')}>{blog.content}</p>

                    <div className={cx('statistical')}>
                        <span className={cx('number')}>
                            <AiFillLike className={cx('icon')} />
                            {blog.like.count}
                        </span>
                        <span className={cx('number')}>
                            <FaCommentAlt className={cx('icon')} />
                            {blog.comment.count}
                        </span>
                    </div>
                </div>
                {blog?.thumbnail && <Image className={cx('blog-img')} src={blog?.thumbnail} alt="image" />}
            </div>
        </div>
    );
}

export default Card;
