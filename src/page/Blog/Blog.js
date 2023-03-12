import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { useSelector } from 'react-redux';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { GoCommentDiscussion } from 'react-icons/go';
import MDEditor from '@uiw/react-md-editor';
import Comments from '~/components/Comments';
import Suggestion from '~/components/Suggestion';
import useTitle from '~/hooks/useTitle';
import Overlay from '~/components/Overlay/Overlay';
import CardHeader from '~/components/Card/CardHeader';
import { timeCaculate, handleAuth } from '~/helper';
import { sendNotification } from '~/services/socket';
import { useDispatch } from 'react-redux';
import { addToast } from '~/auth/redux/actions';
import { blogService, likeService, bookmarkService } from '~/services';
const cx = classNames.bind(styles);

function Blog() {
    const [blog, setBlog] = useState({});
    const [likes, setLikes] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(false);
    const [commentModel, setCommentModel] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state);
    const param = useParams();
    const id = param.id;
    const href = useLocation().pathname;
    const navigate = useNavigate();

    useTitle(blog?.title);
    const dispatch = useDispatch();

    const handleClickBookmark = useCallback(
        (e) => {
            const fetchApi = async () => {
                const result = await bookmarkService.bookmarkBlog({ blog_id: id });
                setIsBookmarked(result.isBookmarked);
                if (isBookmarked) {
                    dispatch(addToast({ type: 'toast-info', mess: 'Xóa vào mục đã lưu' }));
                } else {
                    dispatch(addToast({ type: 'toast-info', mess: 'Thêm vào mục đã lưu' }));
                }
                if (user._id !== blog?.author?._id) {
                    sendNotification({
                        notification: {
                            type: isBookmarked ? 'UN_STORE' : 'STORE',
                            receiver: blog?.author?._id,
                            sender: user._id,
                            target: blog._id,
                        },
                    });
                }
            };

            handleAuth({ isAuthenticated, authHandle: fetchApi, path: href });
        },
        [isBookmarked, blog, href],
    );

    const handleClickUser = useCallback(
        (e) => {
            navigate(`/profile/${blog?.author?._id}`);
        },
        [blog, href],
    );

    const handleClickShare = useCallback((e) => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await blogService.getBlog({ id });
            setBlog(result);
            setLikes(result?.like?.count);
            setComments(result?.comment?.count);
        };

        fetchApi();
    }, [id, href]);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await likeService.checkLike({ id });
            setLiked(result.liked);
            const _result = await bookmarkService.checkBookmark({ blog_id: id });
            setIsBookmarked(_result?.isBookmarked);
        };

        handleAuth({ isAuthenticated, authHandle: fetchAPI });
    }, [id, blog]);

    const handleLikeButton = useCallback(() => {
        const fetchAPI = async () => {
            const result = await likeService.likeBlog({ blog_id: id });
            setLiked(result.liked);
            setLikes(result.count);
            if (user._id !== blog?.author?._id) {
                // console.log(' Lik ');
                sendNotification({
                    notification: {
                        type: liked ? 'UN_LIKE' : 'LIKE',
                        receiver: blog.author._id,
                        sender: user._id,
                        target: blog._id,
                    },
                });
            }
        };

        handleAuth({ isAuthenticated, authHandle: fetchAPI, path: href });
    }, [liked, blog]);

    const handleCommentButton = useCallback(() => {
        setCommentModel(true);
    }, []);

    const handleClickTopic = useCallback(
        (topic) => {
            console.log(topic);
            navigate(`/search?topic=${topic.trim()}`);
        },
        [blog],
    );

    const handleClose = useCallback(() => setCommentModel(false), []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <span className={cx('author')}>{blog?.author?.username}</span>
                <div className={cx('statistical')}>
                    <div className={cx('like')} onClick={handleLikeButton}>
                        {liked ? (
                            <RiHeart3Fill className={cx('statistical-icon', 'active-like-icon')} />
                        ) : (
                            <RiHeart3Line className={cx('statistical-icon', 'like-icon')} />
                        )}
                        <span>{likes}</span>
                    </div>
                    <div className={cx('comment')} onClick={handleCommentButton}>
                        <GoCommentDiscussion className={cx('statistical-icon')} />
                        <span>{comments}</span>
                    </div>
                </div>
            </div>
            <div className={cx('md-editor')}>
                <h1 className={cx('title')}>{blog?.title}</h1>
                <CardHeader
                    isBookmarked={isBookmarked}
                    blogId={blog?._id}
                    onClickUser={handleClickUser}
                    onClickBookMark={handleClickBookmark}
                    onClickShare={handleClickShare}
                    avatar={blog?.author?.avatar}
                    author={blog?.author?.username}
                    time={timeCaculate(blog?.createdAt)}
                />
                <MDEditor.Markdown
                    source={blog?.content}
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={cx('preview')}
                />

                <div className={cx('statistical')}>
                    <div className={cx('like')} onClick={handleLikeButton}>
                        {liked ? (
                            <RiHeart3Fill className={cx('statistical-icon', 'active-like-icon')} />
                        ) : (
                            <RiHeart3Line className={cx('statistical-icon', 'like-icon')} />
                        )}
                        <span>{likes}</span>
                    </div>
                    <div className={cx('comment')} onClick={handleCommentButton}>
                        <GoCommentDiscussion className={cx('statistical-icon')} />
                        <span>{blog?.comment?.count || 0}</span>
                    </div>
                </div>
                <div className={cx('topics')}>
                    <h5 className={cx('topics-title')}>Topics : </h5>
                    {blog?.topic?.length > 0 &&
                        blog?.topic?.map((topic, index) => {
                            return (
                                <span key={index} className={cx('topic')} onClick={() => handleClickTopic(topic)}>
                                    {topic}
                                </span>
                            );
                        })}
                </div>

                <Suggestion topics={blog?.topic} author={blog?.author?._id} />
            </div>

            {commentModel && (
                <Overlay onClose={handleClose}>
                    <Comments
                        setCountComments={setComments}
                        onClose={handleClose}
                        blogId={id}
                        author={blog?.author?._id}
                    />
                </Overlay>
            )}
        </div>
    );
}

export default Blog;
