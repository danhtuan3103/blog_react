import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import Button from '~/components/Button';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateAvatar } from '~/auth/redux/actions';
import { useNavigate } from 'react-router-dom';
import { authService } from '~/services';

const cx = classNames.bind(styles);
function Avatar() {
    const user = useSelector((state) => state.user);

    const [thumb, setThumb] = useState(user?.avatar || '');
    const [file, setFile] = useState('');
    const [showImages, setShowImages] = useState(false);
    const [listImage, setListImage] = useState([]);
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        axios(`${window.location.origin}/images/avatar/avatars.json`)
            .then((res) => {
                const data = res.data;
                setListImage(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleRandom = () => {
        const random = Math.floor(Math.random() * listImage.length);

        setThumb(listImage[random].link);
    };

    const handleClickChoose = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const fetchAPI = async () => {
                const result = await authService.uploadAvatar({ avatar: formData });
                dispatch(updateAvatar(result));
                navigate('/');
            };
            fetchAPI();
        } else {
            if (thumb) {
                console.log('aaaaaa');
                const fetchAPI = async () => {
                    const result = await authService.updateAvatar({ avatar: thumb });
                    console.log(result);
                    dispatch(updateAvatar(result));
                    navigate('/');
                };

                fetchAPI();
            }
        }
    };

    const handleUploadAvatar = () => {
        const fileInput = fileRef.current;
        fileInput.click();
    };

    const handleChangeFile = (e) => {
        if (e.target.files) {
            setThumb(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            setShowImages(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-select')}>
                <div className={cx('image')} style={thumb ? { border: 'none', backgroundColor: 'transparent' } : {}}>
                    {!thumb ? (
                        <Button text onClick={() => setShowImages(true)}>
                            Chọn ảnh
                        </Button>
                    ) : (
                        <img src={thumb} className={cx('thumb')} onClick={() => setShowImages(true)} />
                    )}
                </div>
                {thumb && (
                    <div className={cx('thumb-hover')}>
                        <Button className={cx('hover-text')} text onClick={() => setShowImages(true)}>
                            Chọn ảnh
                        </Button>
                    </div>
                )}
            </div>

            <div className={cx('btn-box')}>
                <Button yellow large className={cx('btn')} onClick={handleRandom}>
                    Random
                </Button>
                <Button yellow={thumb} disabled={!thumb} large className={cx('btn')} onClick={handleClickChoose}>
                    Choose
                </Button>
            </div>

            {showImages && (
                <div className={cx('overlay')} onClick={() => setShowImages(false)}>
                    <div className={cx('img-list')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('desktop-img')}>
                            <Button text onClick={handleUploadAvatar}>
                                Computer
                            </Button>
                            <input
                                type="file"
                                onChange={handleChangeFile}
                                hidden
                                ref={fileRef}
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </div>
                        {listImage.map((img, key) => {
                            return (
                                <img
                                    key={key}
                                    src={img.link}
                                    className={cx('img')}
                                    onClick={() => {
                                        setThumb(img.link);
                                        setFile(null);
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
