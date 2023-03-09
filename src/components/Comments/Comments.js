import classNames from 'classnames/bind';
import style from './Comments.module.scss';
import { MdClose } from 'react-icons/md';
import Image from '~/components/Image';
import images from '~/assets/images';
import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Comment from './Comment';
import CommentInput from './CommentInput';
import instance from '~/config/axiosConfig';
import { sendNotification } from '~/services/socket';
const cx = classNames.bind(style);

function Comments({ setCountComments, onClose, blogId, author }) {
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState([]);

    const { user } = useSelector((state) => state);

    const rootComment = useMemo(() => comments.filter((comment) => comment.isRoot === true), [comments]);

    const getChildrenComment = (parrentId) => {
        const childComments = comments.filter((comm) => {
            return comm.parrent === parrentId;
        });

        return childComments;
    };

    useEffect(() => {
        instance
            .get(`/blog/comment/${blogId}`)
            .then((res) => {
                const data = res.data.comments;
                setComments(data);
            })
            .then((err) => {
                console.log(err);
            });
    }, []);

    const addRootComment = (content) => {
        const data = {
            content,
            isRoot: true,
            parrent: null,
        };

        instance
            .post(`/blog/comment/${blogId}`, data)
            .then((res) => {
                const data = res.data?.data || [];
                setComments(data);
                setCountComments((pre) => pre + 1);
                setComment(false);
                sendNotification({
                    notification: {
                        type: 'COMMENT',
                        receiver: author,
                        sender: user._id,
                        target: blogId,
                        message: content,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <span className={cx('close')} onClick={onClose}>
                <MdClose className={cx('close-icon')} />
            </span>

            <div className={cx('body')}>
                <h2 className={cx('title')}>Comment</h2>

                <div className={cx('write')}>
                    <Image className={cx('avatar')} fallBack={images.fallbackAvatar} />
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

export default Comments;
