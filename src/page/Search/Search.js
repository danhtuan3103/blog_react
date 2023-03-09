import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Card from '~/components/Card';
import Search from '~/components/Search';
import { useEffect, useState } from 'react';
import instance from '~/config/axiosConfig';
import axiosConfig from '~/config/axiosConfig';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useTitle from '~/hooks/useTitle';
import Pagination from '~/components/Pagination';
const cx = classNames.bind(styles);

function SearchPage() {
    const [cards, setCards] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 1);
    useTitle('Search');

    const [topic, setTopic] = useState(searchParams.get('topic') || 'All');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setSearchParams({ topic, page });
        instance.get(`/blog/?topic=${topic}&page=${page}&limit=${5}`).then((res) => {
            setCards(res.data.data);
        });
    }, [page, topic]);

    const handleClickTopic = (topic) => {
        setTopic(topic);
        setPage(1);
        setSearchParams({ topic, page });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>ALL ABOUT TECHNOLOGY</h2>
                <p>Một trang blog cá nhân mà bản thân viết và sưu tập từ nhiều nguồn khác nhau</p>
            </div>
            <div className={cx('search')}>
                <Search value={searchValue} setValue={setSearchValue} />
            </div>

            <p className={cx('title')}>Duyệt theo chủ đề</p>

            <div className={cx('line')}>
                <div className={cx('topic-list')}>
                    {['All', 'React', 'NodeJs', 'MongoDB', 'NetWork', 'Javascript', 'C'].map((key, index) => {
                        return (
                            <p
                                className={cx('topic', { active: topic === key })}
                                key={index}
                                onClick={() => handleClickTopic(key)}
                            >
                                {key}
                            </p>
                        );
                    })}
                </div>
            </div>

            <div className={cx('list')}>
                {cards.map((card, index) => {
                    return <Card key={index} className={cx('card')} blog={card}></Card>;
                })}
            </div>

            <div className={cx('pagination')}>
                <Pagination value={page} setValue={setPage} />
            </div>
        </div>
    );
}

export default SearchPage;
