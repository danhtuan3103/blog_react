import className from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { useAutoResize } from '~/hooks';
import useTitle from '~/hooks/useTitle';
import request from '~/utils/httpRequest';
import styles from './Feedback.module.scss';

const cx = className.bind(styles);
function Feedback() {
    const [feedback, setFeedback] = useState('');
    useTitle('Feedback');
    const textRef = useAutoResize(feedback);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const res = await (await request.post('/feedback', { feedback })).data;

        if (res.status === 'success') {
            setFeedback('');
            alert('Thanks for feedback');
            navigate('/search');
        } else {
            alert('Somthing was error');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>Give me a feedback</h3>
                <textarea
                    ref={textRef}
                    type="text"
                    name="text"
                    className={cx('input')}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <Button yellow onClick={handleSubmit}>
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Feedback;
