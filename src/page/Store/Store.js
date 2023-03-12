import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { useCallback, useEffect, useState } from 'react';
import PostHeader from './PostHeader';
import Item from './Item';
import { bookmarkService } from '~/services';
import { sortByDate } from '~/helper';
const cx = classNames.bind(styles);

function Store() {
    const [bookmarks, setBookmarks] = useState([]);

    const handleDelete = useCallback((id) => {
        // let newCards = bookmarks.filter((c) => c.id !== id);
        // setCards(newCards);
        const fetchAPI = async () => {
            const result = await bookmarkService.deleteBookmark({ blog_id: id });
            setBookmarks(result);
        };
        fetchAPI();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await bookmarkService.getAllBookmark();
            setBookmarks(sortByDate(result));
        };
        fetchAPI();
    }, []);

    const TYPES = [{ title: `Bài viết (${bookmarks.length || 0})`, active: 'posts', root: 'store' }];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Bài viết đã lưu</h2>

                <PostHeader types={TYPES} />
                <div className={cx('body')}>
                    {bookmarks.map((bookmark, index) => {
                        return <Item bookmark={bookmark} key={index} handleDelete={handleDelete} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Store;
