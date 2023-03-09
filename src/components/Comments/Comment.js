import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Comments.module.scss';
import images from '~/assets/images';
import Image from '../Image';
import { BsDot } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CommentInput from './CommentInput';
import instance from '~/config/axiosConfig';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { timeCaculate } from '~/helper';
import { sendNotification } from '~/services/socket';
const cx = classNames.bind(style);

function Comment({ setCountComments, setComments, comment, getComment, reply, className, blogAuthor }) {
    const [seeMore, setSeeMore] = useState(false);
    const [openInput, setOpenInput] = useState(false);

    const param = useParams();
    const blogId = param.id;

    const { user } = useSelector((state) => state);

    const handleLikeBtn = (e) => {
        if (e.target.style.fontWeight === 'bold') {
            e.target.style.fontWeight = 'normal';
            return;
        }
        e.target.style.fontWeight = 'bold';
    };

    const childrenComments = getComment(comment._id);

    const isChidrens = childrenComments && childrenComments.length > 0;

    const addChildComment = (content) => {
        const data = {
            content,
            isRoot: false,
            parrent: comment._id,
        };

        instance
            .post(`/blog/comment/${blogId}`, data)
            .then((res) => {
                const data = res.data?.data || [];
                setComments(data);
                setSeeMore(true);
                setOpenInput(false);
                setCountComments((pre) => pre + 1);
                sendNotification({
                    notification: {
                        type: 'REPLY',
                        receiver: comment.author,
                        sender: user._id,
                        target: blogId,
                        message: content,
                    },
                });
                sendNotification({
                    notification: {
                        type: 'COMMENT',
                        receiver: blogAuthor,
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
    const classes = cx('comment-wrapper', { className: [className], reply });
    return (
        <div className={classes}>
            <div className={cx('comment-per-user')}>
                <Image className={cx('avatar')} fallBack={images.fallbackAvatar} />
                <div className={cx('comment-box')}>
                    <span className={cx('name')}>{comment.author}</span>
                    <p className={cx('comment-content')}>{comment.content}</p>
                </div>
            </div>
            <div className={cx('comment-tools')}>
                <span className={cx('comment-tool')} onClick={handleLikeBtn}>
                    Thích
                </span>{' '}
                <span className={cx('dot')}>
                    <BsDot />
                </span>
                <span className={cx('comment-tool')} onClick={() => setOpenInput(true)}>
                    Trả lời
                </span>{' '}
                <span className={cx('dot')}>
                    <BsDot />
                </span>
                <span className={cx('comment-tool')}>{timeCaculate(comment.createdAt)}</span>
            </div>

            {openInput && (
                <div className={cx('reply-box')}>
                    <Image className={cx('avatar')} src={user.avatar} fallBack={images.fallbackAvatar} />
                    <CommentInput
                        setComment={setOpenInput}
                        reply={true}
                        defaultValue="@Danh Tuan "
                        onSubmit={addChildComment}
                    />
                </div>
            )}

            {isChidrens && (
                <div
                    className={cx(seeMore ? 'see-less' : 'see-more')}
                    onClick={() => {
                        setSeeMore(!seeMore);
                    }}
                >
                    <span>{seeMore ? 'Ẩn câu trả lời' : `Xem ${childrenComments.length} câu trả lời`}</span>
                    {seeMore ? <FaChevronUp className={cx('icon')} /> : <FaChevronDown className={cx('icon')} />}
                </div>
            )}

            {seeMore &&
                childrenComments.map((comment, index) => (
                    <Comment
                        setCountComments={setCountComments}
                        setComments={setComments}
                        comment={comment}
                        key={index}
                        getComment={getComment}
                        reply
                    />
                ))}
        </div>
    );
}

export default Comment;
