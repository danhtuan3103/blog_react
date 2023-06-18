import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';
import Box from '~/components/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { timeCaculate } from '~/helper';
import useTitle from '~/hooks/useTitle';
import { sortByDate } from '~/helper';
import getTypeNotifiication from '~/helper/getTypeNotification';
import { authService, notificationService } from '~/services';

const cx = classNames.bind(styles);
function Profile() {
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState({});
    const [activitys, setActivitys] = useState([]);
    useTitle(user?.username || 'Profile');
    const navigate = useNavigate();

    console.log(activitys.length);
    useEffect(() => {
        const fetchAPI = async () => {
            const _result = await authService.getInfo({ id });
            setUser(_result);
            const result = await notificationService.getActivitys({ id });
            setActivitys(sortByDate(result));
        };
        fetchAPI();
    }, [id]);
    let blogs = user?.blogs || [];

    console.log(blogs);

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
                            <Image
                                className={cx('img')}
                                src={user.avatar}
                                fallback={images.fallbackAvatar}
                                alt={user.username}
                            />
                            <p className={cx('text')}>
                                Bạn đã tham gia vào blog được{' '}
                                <strong className={cx('strong-text')}>{timeCaculate(user.createdAt)}</strong>
                            </p>
                        </div>
                    </Box>

                    <Box title="Hoạt động" className={cx('box', 'box2')}>
                        <div className={cx('list1')}>
                            {activitys.map((activity, index) => {
                                return (
                                    <div className={cx('item2')} key={activity?._id}>
                                        <Image
                                            className={cx('img')}
                                            src={activity?.sender?.avatar}
                                            fallback={images.fallbackAvatar}
                                            alt={activity?.sender?.username}
                                        />

                                        <p className={cx('text')}>
                                            {
                                                <strong
                                                    className={cx('strong-text')}
                                                    onClick={() => handleClickUser(activity?.sender?._id)}
                                                >
                                                    {activity?.sender?.username}
                                                </strong>
                                            }{' '}
                                            đã {getTypeNotifiication(activity?.type)}{' '}
                                            <strong
                                                className={cx('strong-text')}
                                                onClick={() => handleClickBlog(activity?.target?._id)}
                                            >
                                                {activity?.target?.title}
                                            </strong>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </Box>
                </div>
                <div className={cx('right-side')}>
                    <Box title="Bài viết của bạn" className={cx('box')}>
                        <div className={cx('list2')}>
                            {blogs.map((post) => {
                                return (
                                    <div className={cx('post')} key={post?._id}>
                                        {post?.thumbnail && (
                                            <Image
                                                className={cx('post-img')}
                                                src={post?.thumbnail}
                                                onClick={() => handleClickBlog(post?._id)}
                                            />
                                        )}
                                        <div className={cx('post-info')} onClick={() => handleClickBlog(post?._id)}>
                                            <h4 className={cx('post-title')}>{post?.title}</h4>
                                            <p className={cx('post-content')}>{post?.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Box>
                </div>
            </section>
        </div>
    );
}

export default Profile;
