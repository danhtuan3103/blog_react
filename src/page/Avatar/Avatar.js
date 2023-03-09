import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import Button from '~/components/Button';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import instance from '~/config/axiosConfig';
import { updateAvatar } from '~/auth/redux/actions';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Avatar() {
    const [thumb, setThumb] = useState('');
    const [showImages, setShowImages] = useState(false);
    const [listImage, setListImage] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        axios(`${process.env.REACT_API_URL}/images/avatar/avatars.json`)
            .then((res) => {
                const data = res.data;
                console.log(data);

                setListImage(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleRandom = () => {
        const random = Math.floor(Math.random() * listImage.length);

        setThumb(listImage[random].link);
    };

    const handleClickChoose = () => {
        instance
            .post('/user/avatar', { avatar: thumb })
            .then((res) => {
                const data = res.data.data;
                console.log(data);
                if (data) {
                    dispatch(updateAvatar(res.data.data));
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-select')}>
                <div className={cx('image')} style={thumb ? { border: 'none', backgroundColor: 'transparent' } : {}}>
                    {!thumb ? (
                        <Button text onClick={() => setShowImages(true)}>
                            Chọn ảnh bìa
                        </Button>
                    ) : (
                        <img src={thumb} className={cx('thumb')} onClick={() => setShowImages(true)} />
                    )}
                </div>
            </div>

            <div className={cx('btn-box')}>
                <Button yellow large className={cx('btn')} onClick={handleRandom}>
                    Random
                </Button>
                <Button yellow large className={cx('btn')} onClick={handleClickChoose}>
                    Choose
                </Button>
            </div>

            {showImages && (
                <div className={cx('overlay')} onClick={() => setShowImages(false)}>
                    <div className={cx('img-list')} onClick={(e) => e.stopPropagation()}>
                        {listImage.map((img, key) => {
                            return (
                                <img
                                    key={key}
                                    src={img.link}
                                    className={cx('img')}
                                    onClick={() => {
                                        setThumb(img.link);
                                        setShowImages(false);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Avatar;
