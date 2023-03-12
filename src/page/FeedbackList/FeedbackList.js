import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as request from '~/utils/httpRequest';
import styles from './FeedbackList.module.scss';

const cx = classNames.bind(styles);
function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await (await request.get('/feedback')).data;
            setFeedbacks(result);
        };

        fetchAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('feedbacks')}>
                    {feedbacks.map((feed, index) => {
                        return (
                            <div className={cx('feedback')} key={index}>
                                <p className={cx('content')}>{feed.feedback}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FeedbackList;
