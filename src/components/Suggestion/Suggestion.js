import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import instance from '~/config/axiosConfig';
import styles from './Suggestion.module.scss';
import SuggestItem from './SuggestItem';

const cx = classNames.bind(styles);
function Suggestion({ topics, author }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        instance
            .post('/blog/suggestion', { topic: topics, author: author })
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    setBlogs(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

export default Suggestion;
