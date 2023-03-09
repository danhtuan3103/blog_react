import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import images from '~/assets/images';
import { useOutsideClick, useDebounce } from '~/hooks';
import 'tippy.js/dist/tippy.css';
import instance from '~/config/axiosConfig';
import Image from '../Image';
const cx = classNames.bind(styles);
function Search({ value, setValue }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    const debouncedValue = useDebounce(value, 1000);

    const handleClickOutside = () => {
        if (boxRef.current) {
            boxRef.current.style.display = 'none';
        }
    };

    const boxRef = useOutsideClick(handleClickOutside);
    // console.log(value);
    useEffect(() => {
        if (!debouncedValue) {
            setResults([]);
            return;
        }
        setLoading(true);

        const fetchAPI = async () => {
            const result = await (await instance.get(`/blog?q=${value}`)).data;
            setLoading(false);
            setResults(result.data);
        };
        fetchAPI();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }

        if (value.length === 0) {
            setResults([]);
        }
        setValue(value);
    };

    const handleClear = () => {
        setValue('');

        setResults([]);
        inputRef.current.focus();
    };

    const handleClickInput = (e) => {
        e.stopPropagation();
        if (value) {
            boxRef.current.style.display = 'block';
        }
    };

    const handleSeeAll = () => {
        navigate(`/search/posts?q=${value}`);
    };
    return (
        <div className={cx('wrapper')} onClick={handleClickInput}>
            <FiSearch className={cx('icon', 'search-icon')} />
            <input
                ref={inputRef}
                className={cx('search-input')}
                placeholder="Search grammar"
                value={value}
                onChange={handleChange}
            />
            {!!value && (
                <span className={cx('icon-block')} onClick={handleClear}>
                    <MdClose className={cx('icon')} />
                </span>
            )}

            {value && (
                <div className={cx('dropbox')} ref={boxRef}>
                    <h4 className={cx('title')}>Grammar</h4>

                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}

                    {results.length > 0 ? (
                        <div className={cx('results')}>
                            {results.map((item, index) => {
                                return (
                                    <div className={cx('item')} key={index}>
                                        <Image src={item?.thumbnail || ''} className={cx('img')} />
                                        <div className={cx('info')}>
                                            <h4 className={cx('item-title')}>{item?.title || ''}</h4>
                                            <p className={cx('author')}>
                                                Created by <strong>{item?.author?.username || ''}</strong>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className={cx('seeall')}>Khong co ket qua</p>
                    )}
                    {results.length > 0 && (
                        <p className={cx('seeall')} onClick={handleSeeAll}>
                            {' '}
                            See all
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
