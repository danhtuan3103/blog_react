import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { useSelector } from 'react-redux';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { GoCommentDiscussion } from 'react-icons/go';
import MDEditor from '@uiw/react-md-editor';
import Comments from '~/components/Comments';
import Suggestion from '~/components/Suggestion';
import instance from '~/config/axiosConfig';
import useTitle from '~/hooks/useTitle';
import Overlay from '~/components/Overlay/Overlay';
import CardHeader from '~/components/Card/CardHeader';
import { timeCaculate } from '~/helper';
import { pingSocket, sendNotification } from '~/services/socket';

const cx = classNames.bind(styles);

function Blog() {
    const [blog, setBlog] = useState({});
    const [likes, setLikes] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(false);
    const [commentModel, setCommentModel] = useState(false);
    const { user } = useSelector((state) => state);
    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();

    useTitle(blog.title);

    const handleClickBookmark = (e) => {
        instance
            .post(`/bookmark/${id}`)
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

    const handleClickUser = (e) => {
        navigate(`/profile/${blog?.author?._id}`);
    };
    useEffect(() => {
        instance.get(`/blog/${id}`).then((response) => {
            const isExit = response?.data?.data;
            if (isExit) {
                const blog = response.data.data;
                setBlog(blog);
                setLikes(blog.like.count);
                setComments(blog.comment.count);
            } else {
                alert('Khong co blog');
            }
        });
    }, [liked, comments, id]);

    useEffect(() => {
        instance
            .get(`/bookmark/check/${id}`)
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
    }, [id]);

    useEffect(() => {
        instance.get(`/blog/like/check/${id}`).then((response) => {
            const isExit = response?.data?.data;
            if (!!isExit) {
                setLiked(isExit.liked);
            } else {
                alert('Khong co blog');
            }
        });
    }, [id]);

    const handleLikeButton = () => {
        if (user._id) {
            instance
                .post('/blog/like', {
                    blog_id: id,
                })
                .then((res) => {
                    setLiked(res.data.data.liked);
                    setLikes(res.data.data.count);
                    sendNotification({
                        notification: {
                            type: liked ? 'UN_LIKE' : 'LIKE',
                            receiver: blog.author._id,
                            sender: user._id,
                            target: blog._id,
                        },
                    });
                });
        } else {
            window.location.href = `/login/?continute=/blog/${id}`;
        }
    };

    const handleCommentButton = () => {
        setCommentModel(true);
    };

    const handleClickTopic = (topic) => {
        navigate(`/search?topic=${topic}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <span className={cx('author')}>{blog.author?.username}</span>
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
                <h1 className={cx('title')}>{blog.title}</h1>
                <CardHeader
                    isBookmarked={isBookmarked}
                    onClickUser={handleClickUser}
                    onClickBookMark={handleClickBookmark}
                    avatar={blog?.author?.avatar}
                    author={blog?.author?.username}
                    time={timeCaculate(blog.createdAt)}
                />
                <MDEditor.Markdown source={blog.content} style={{ whiteSpace: 'pre-wrap' }} className={cx('preview')} />

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
                        <span>{blog.comment?.count || 0}</span>
                    </div>
                </div>
                <div className={cx('topics')}>
                    <h5 className={cx('topics-title')}>Topics : </h5>
                    {blog?.topic?.length > 0 &&
                        blog.topic.map((topic, index) => {
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
                <Overlay onClose={() => setCommentModel(false)}>
                    <Comments
                        setCountComments={setComments}
                        onClose={() => setCommentModel(false)}
                        blogId={id}
                        author={blog.author._id}
                    />
                </Overlay>
            )}
        </div>
    );
}

export default Blog;
