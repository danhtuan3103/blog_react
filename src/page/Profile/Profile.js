import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';
import Box from '~/components/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '~/config/axiosConfig';
import Button from '~/components/Button';
import { timeCaculate } from '~/helper';
import useTitle from '~/hooks/useTitle';
import { sortByDate } from '~/helper/sortByDate';
import getTypeNotifiication from '~/helper/getTypeNotification';

const cx = classNames.bind(styles);
function Profile() {
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState({});
    const [activitys, setActivitys] = useState([]);
    useTitle(user?.username || 'Profile');

    console.log(activitys);
    const navigate = useNavigate();
    useEffect(() => {
        instance
            .get(`/user/${id}`)
            .then((res) => {
                if (res.data.status === 'success') {
                    setUser(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        instance
            .get(`/notifications/${id}`)
            .then((res) => {
                const data = res.data.data;
                setActivitys(sortByDate(data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    let blogs = user?.blogs || [];

    const handleClickUser = (id) => {
        navigate(`/profile/${id}`);
    };

    const handleClickBlog = (id) => {
        navigate(`/blog/${id}`);
    };
    return (
        <div className={cx('wrapper')}>
            <section className={cx('banner')}>
                <div className={cx('user')}>
                    <Image className={cx('avatar')} src={user?.avatar} fallBack={images.fallbackAvatar} />
                    <div className={cx('username')}>
                        <span className={cx('name')}>{user?.username}</span>
                    </div>
                </div>
            </section>

            <section className={cx('body')}>
                <div className={cx('left-side')}>
                    <Box title="Giới thiệu" className={cx('box')}>
                        <div className={cx('item')}>
                            <Image className={cx('img')} src={user?.avatar} fallBack={images.fallbackAvatar} />
                            <p className={cx('content')}>Đã tham gia vào {timeCaculate(user?.createdAt)}</p>
                        </div>
                    </Box>

                    <Box title="Hoạt động gần đây" className={cx('box')}>
                        {activitys.length > 0 ? (
                            activitys.map((ac, index) => {
                                return (
                                    <div className={cx('item')} key={index}>
                                        <Image
                                            className={cx('img')}
                                            src={user?.avatar}
                                            fallBack={images.fallbackAvatar}
                                        />
                                        <div className={cx('content')}>
                                            <p className={cx('text')}>
                                                <strong
                                                    className={cx('strong-text')}
                                                    onClick={() => handleClickUser(ac?.sender?._id)}
                                                >
                                                    {ac.sender?.username}
                                                </strong>{' '}
                                                đã
                                                <span className={cx('action')}> {getTypeNotifiication(ac?.type)} </span>
                                                <strong
                                                    className={cx('strong-text')}
                                                    onClick={() => handleClickBlog(ac?.target?._id)}
                                                >
                                                    {ac?.target?.title}
                                                </strong>
                                            </p>
                                            {ac.message && <p className={cx('mess')}>{ac?.message}</p>}
                                            <i className={cx('date')}>{timeCaculate(ac?.createdAt)}</i>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={cx('no-data')}>
                                <span className={cx('text')}>Không có hoạt động nào</span>
                            </div>
                        )}
                    </Box>
                </div>

                <div className={cx('right-side')}>
                    <Box title="Bài viết của bạn" className={cx('box')}>
                        {blogs.length > 0 ? (
                            blogs.map((blog, index) => {
                                return (
                                    <div
                                        className={cx('item2')}
                                        key={index}
                                        onClick={() => navigate(`/blog/${blog._id}`, { replace: true })}
                                    >
                                        {blog?.thumbnail && <Image className={cx('img')} src={blog.thumbnail} />}

                                        <div className={cx('content')}>
                                            <h5 className={cx('title')}>{blog.title}</h5>
                                            <p className={cx('description')}>{blog.content}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={cx('no-data')}>
                                <span className={cx('text')}>Không có bài viết nào</span>
                                <Button className={cx('link')} text onClick={() => navigate('/blog/write')}>
                                    Viết bài mới
                                </Button>
                            </div>
                        )}
                    </Box>
                </div>
            </section>
        </div>
    );
}

export default Profile;
