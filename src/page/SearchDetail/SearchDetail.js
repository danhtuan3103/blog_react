import classNames from 'classnames/bind';
import styles from './SearchDetail.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import instance from '~/config/axiosConfig';
import { useDebounce } from '~/hooks';
import PostHeader from '../Store/PostHeader';
import UserCard from './UseCard';
import BlogCard from './BlogCard';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function SearchDetail() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const ref = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
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
    }, [deboundedValue]);

    useEffect(() => {
        ref.current.focus();
        setSearchParams({ q: searchValue });
        setResult([]);
        if (type === 'posts') {
            const fetchAPI = async () => {
                setLoading(true);
                const result = await (await instance.get(`/blog?q=${searchValue}`)).data;
                setResult(result.data);
                setLoading(false);
            };

            fetchAPI();
        } else if (type === 'author') {
            const fetchAPI = async () => {
                setLoading(true);
                const result = await (await instance.get(`/user?q=${searchValue}`)).data;
                setResult(result.data);
                setLoading(false);
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
                        {/* {loading && <Loading />} */}
                        {type === 'posts' &&
                            result.map((post, index) => {
                                return <BlogCard key={index} blog={post} />;
                            })}

                        {type === 'author' &&
                            result.map((user, index) => {
                                return <UserCard key={index} user={user} />;
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchDetail;
