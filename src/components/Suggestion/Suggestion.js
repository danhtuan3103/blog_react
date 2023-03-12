import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { blogService } from '~/services';
import styles from './Suggestion.module.scss';
import SuggestItem from './SuggestItem';

const cx = classNames.bind(styles);
function Suggestion({ topics, author }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await blogService.suggestBlogs({ topic: topics, author: author });
            setBlogs(result);
        };
        fetchAPI();
    }, [topics, author]);
    return (
        <div className={cx('suggest')}>
            <h4 className={cx('text')}>Suggestions</h4>

            <div className={cx('suggest-list')}>
                {blogs.map((blog, index) => {
                    return <SuggestItem key={index} blog={blog} />;
                })}
            </div>
        </div>
    );
}

export default memo(Suggestion);
