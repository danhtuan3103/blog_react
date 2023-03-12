import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useOutsideClick, useDebounce } from '~/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import 'tippy.js/dist/tippy.css';
import * as request from '~/utils/httpRequest';
import SearchItem from './SearchItem';
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

    useEffect(() => {
        if (!debouncedValue) {
            setResults([]);
            return;
        }
        setLoading(true);

        const fetchAPI = async () => {
            const result = await request.get(`/blog?q=${value}`);
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
                    <div className={cx('results')}>
                        {results.length > 0 ? (
                            results.map((item, index) => {
                                return <SearchItem item={item} key={index} />;
                            })
                        ) : (
                            <p className={cx('no-data')}>Không có kết quả</p>
                        )}
                    </div>
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
