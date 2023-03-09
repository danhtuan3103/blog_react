import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '~/components/Wrapper';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostHeader from './PostHeader';
import instance from '~/config/axiosConfig';
import { timeCaculate } from '~/helper';
const cx = classNames.bind(styles);

function Store() {
    const [bookmarks, setBookmarks] = useState([]);
    const user = useSelector((state) => state.user);

    const handleDelete = (id) => {
        // let newCards = bookmarks.filter((c) => c.id !== id);
        // setCards(newCards);
        instance
            .patch(`/bookmark/${id}`)
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    setBookmarks(data);
                } else {
                    // alert('Sorry, somthing was wrong');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        instance.get(`/bookmark`).then((res) => {
            const data = res.data.data;
            if (data) {
                setBookmarks(data);
            } else {
                alert('Sorry, somthing was wrong');
            }
        });
    }, []);

    const TYPES = [{ title: `Bài viết (${bookmarks.length || 0})`, active: 'posts', root: 'store' }];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Bài viết đã lưu</h2>

                <PostHeader types={TYPES} />
                <div className={cx('body')}>
                    {bookmarks.map((bookmark, index) => {
                        return (
                            <div className={cx('card')} key={index}>
                                <div className={cx('card-top')}>
                                    <h4 className={cx('card-title')}>{bookmark?.blog_id.title}</h4>
                                    <Tippy
                                        // visible={visible}
                                        interactive
                                        trigger="click"
                                        offset={[0, -20]}
                                        placement="bottom-end"
                                        hideOnClick={true}
                                        render={(attr) => {
                                            return (
                                                <div {...attr}>
                                                    <Wrapper className={cx('tippy')}>
                                                        <Button
                                                            className={cx('delete-btn')}
                                                            onClick={(e) => handleDelete(bookmark?.blog_id?._id)}
                                                        >
                                                            Xoa khoi muc da luu
                                                        </Button>
                                                    </Wrapper>
                                                </div>
                                            );
                                        }}
                                    >
                                        <span className={cx('tool-icon')}>
                                            <BsThreeDots className={cx('icon')} />
                                        </span>
                                    </Tippy>
                                </div>
                                <div className={cx('card-bottom')}>
                                    <span className={cx('card-time')}>Đã lưu {timeCaculate(bookmark.createdAt)}</span>
                                    <span className={cx('dot')}>.</span>
                                    <span className={cx('author')}>
                                        Tác giả <strong>{bookmark?.blog_id.author.username}</strong>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Store;
