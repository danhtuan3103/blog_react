import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Comments.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(style);

const defaultFn = () => {};
function CommentInput({ setComment, reply = false, defaultValue = '', onSubmit = defaultFn }) {
    const [value, setValue] = useState(defaultValue);
    const [disabled, setDisabled] = useState(true);
    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (e.target.value.trim() !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleSubmit = () => {
        onSubmit(value);
        setValue('');
    };

    return (
        <div className={cx('comment-input', [reply])}>
            <textarea
                ref={ref}
                className={cx('text-input')}
                placeholder={reply ? 'Viết câu trả lời của bạn ...' : 'Viết bình luận của bạn ...'}
                value={value}
                onChange={handleOnChange}
            />

            <div className={cx('btn-box')}>
                <Button text onClick={() => setComment(false)}>
                    Hủy
                </Button>
                <Button disabled={disabled} rounded yellow onClick={handleSubmit}>
                    {reply ? 'Tra loi' : 'Bình luận'}
                </Button>
            </div>
        </div>
    );
}

export default memo(CommentInput);
