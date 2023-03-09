import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import Card from '~/components/Card';
import Image from '~/components/Image';
import instance from '~/config/axiosConfig';
import { useDebounce } from '~/hooks';
import PostHeader from '../Store/PostHeader';
import styles from './SearchDetail.module.scss';
import { RiHeart3Fill } from 'react-icons/ri';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Card1 = ({ thumbnail, title, likes, comments, onClick }) => {
    return (
        <div className={cx('card1')}>
            {thumbnail && <Image onClick={onClick} className={cx('img')} src={thumbnail}></Image>}
            <h4 className={cx('title')} onClick={onClick}>
                {title}
            </h4>
            <span className={cx('continute')} onClick={onClick}>
                Đọc tiếp...
            </span>
            <div className={cx('numbers')}>
                <span className={cx('like')}>
                    <RiHeart3Fill class={cx('icon')}></RiHeart3Fill>
                    {likes}
                </span>
                <span className={cx('comments')}>{comments} bình luận</span>
            </div>
        </div>
    );
};

const Card2 = ({ avatar, name, aka, blogs, onClick }) => {
    return (
        <div className={cx('card2')} onClick={onClick}>
            <Image className={cx('img')} src={avatar} fallBack={images.fallbackAvatar}></Image>

            <div className={cx('info')}>
                <span className={cx('name')}>{name}</span>
                <span className={cx('aka')}>{aka}</span>
            </div>
        </div>
    );
};

function SearchDetail() {
    const [result, setResult] = useState([]);
    const ref = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const q = searchParams.get('q');
    const [searchValue, setSearchValue] = useState(q || '');
    const deboundedValue = useDebounce(searchValue, 1000);
    const params = useParams();
    const type = params.type;

    useEffect(() => {
        if (deboundedValue === '') {
            ref.current.style.fontSize = '3.2rem';
        } else {
            ref.current.style.fontSize = '2.4rem';
        }

        // return () => {
        //     clearTimeout(timeout);
        // };
    }, [deboundedValue]);

    useEffect(() => {
        ref.current.focus();
        setSearchParams({ q: searchValue });
        setResult([]);
        if (type === 'posts') {
            const fetchAPI = async () => {
                const result = await (await instance.get(`/blog?q=${searchValue}`)).data;
                setResult(result.data);
            };

            fetchAPI();
        } else if (type === 'author') {
            const fetchAPI = async () => {
                const result = await (await instance.get(`/user?q=${searchValue}`)).data;
                setResult(result.data);
            };

            fetchAPI();
        } else {
            alert('Somthing was wrong .... ');
        }
    }, [type, deboundedValue]);
    const TYPES = [
        { title: 'Bài viết', active: 'posts', root: 'search' },
        { title: 'Tác giả', active: 'author', root: 'search' },
    ];

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
        setSearchParams({ q: e.target.value });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input
                    ref={ref}
                    className={cx('input')}
                    placeholder="Tim kiem ..."
                    value={searchValue}
                    onChange={handleOnChange}
                ></input>
            </div>

            {!!deboundedValue && (
                <div className={cx('container')}>
                    <PostHeader types={TYPES} />

                    <div className={cx('body')}>
                        {type === 'posts' &&
                            result.map((post, index) => {
                                return (
                                    <Card1
                                        onClick={() => navigate(`/blog/${post._id}`)}
                                        key={index}
                                        title={post.title}
                                        thumbnail={post.thumbnail}
                                        likes={post.like?.count}
                                        comments={post.comment?.count}
                                    />
                                );
                            })}

                        {type === 'author' &&
                            result.map((user, index) => {
                                return (
                                    <Card2
                                        key={index}
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        name={user.username}
                                        aka={user.email}
                                        avatar={user.avatar}
                                    />
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchDetail;
