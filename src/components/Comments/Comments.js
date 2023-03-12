import classNames from 'classnames/bind';
import style from './Comments.module.scss';
import { MdClose } from 'react-icons/md';
import Image from '~/components/Image';
import images from '~/assets/images';
import { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { sendNotification } from '~/services/socket';
import { useLocation, useNavigate } from 'react-router-dom';
import { commentService } from '~/services';
import { sortByDate, handleAuth } from '~/helper';

const cx = classNames.bind(style);

function Comments({ setCountComments, onClose, blogId, author }) {
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState([]);
    const { user, isAuthenticated } = useSelector((state) => state);
    const href = useLocation().pathname;
    const navigate = useNavigate();
    const rootComment = useMemo(() => sortByDate(comments.filter((comment) => comment.isRoot === true)), [comments]);

    const getChildrenComment = useCallback((parrentId) => {
        const childComments = comments.filter((comm) => {
            return comm.parrent === parrentId;
        });

        return childComments;
    });

    const handleClickUser = useCallback((id) => {
        navigate(`/profile/${id}`);
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await commentService.getCommentOfBlog({ blog_id: blogId });
            setComments(result);
        };
        fetchAPI();
    }, [blogId]);

    console.log(comments);
    const addRootComment = useCallback((content) => {
        const data = {
            content,
            isRoot: true,
            parrent: null,
        };

        const fetchAPI = async () => {
            const result = await commentService.addComment({ blog_id: blogId, comment: data });
            setComments(result);
            setCountComments((pre) => pre + 1);
            setComment(false);
            if (user._id !== author) {
                sendNotification({
                    notification: {
                        type: 'COMMENT',
                        receiver: author,
                        sender: user._id,
                        target: blogId,
                        message: content,
                    },
                });
            }
        };

        handleAuth({ isAuthenticated, authHandle: fetchAPI, path: href });
    }, []);

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <span className={cx('close')} onClick={onClose}>
                <MdClose className={cx('close-icon')} />
            </span>

            <div className={cx('body')}>
                <h2 className={cx('title')}>Comment</h2>

                <div className={cx('write')}>
                    <Image
                        className={cx('avatar')}
                        src={user?.avatar}
                        fallBack={images.fallbackAvatar}
                        onClick={() => handleClickUser(user._id)}
                    />
                    {comment ? (
                        <CommentInput setComment={setComment} onSubmit={addRootComment} />
                    ) : (
                        <div className={cx('comment-placeholder')} onClick={(e) => setComment(true)}>
                            <span>Viết bình luận của bạn...</span>
                        </div>
                    )}
                </div>

                <div className={cx('comments')}>
                    {rootComment.map((comm, i) => {
                        return (
                            <Comment
                                blogAuthor={author}
                                setCountComments={setCountComments}
                                setComments={setComments}
                                key={i}
                                comment={comm}
                                getComment={getChildrenComment}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default memo(Comments);
