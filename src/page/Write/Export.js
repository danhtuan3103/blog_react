import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Write.module.scss';
import Confetti from '~/components/Confetti';

const cx = classNames.bind(styles);
function Export({ topic, onTopic, thumbnail, onThumbnail, onSubmit }) {
    return (
        <div className={cx('export')}>
            <div className={cx('left')}>
                <h4>Preview</h4>
                <div className={cx('upload')}>
                    <p className={cx('description')}>
                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                    </p>

                    <span className={cx('upload-text')}>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</span>
                    <input type="file" hidden></input>
                </div>

                <h4>Or</h4>
                <div className={cx('link-file')}>
                    {/* <span className={cx('label')}>Image Link</span> */}
                    <input
                        className={cx('link-input')}
                        placeholder="Copy link image in here"
                        value={thumbnail}
                        onChange={(e) => onThumbnail(e)}
                    />
                </div>
            </div>
            <div className={cx('right')}>
                <span className={cx('description')}>
                    Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì
                </span>
                <input
                    className={cx('topic-input')}
                    type="text"
                    placeholder="Ví dụ : React, Nodejs, MongoDb"
                    value={topic}
                    onChange={(e) => onTopic(e)}
                />

                <Button yellow className={cx('btn')} onClick={onSubmit}>
                    Xuất bản ngay
                </Button>
            </div>
        </div>
    );
}

export default Export;
