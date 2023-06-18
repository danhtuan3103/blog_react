import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Card from '~/components/Card';
import Search from '~/components/Search';
import { useCallback, useEffect, useState } from 'react';
import * as blogService from '~/services/blogService';
import { useLocation, useSearchParams } from 'react-router-dom';
import useTitle from '~/hooks/useTitle';
import Pagination from '~/components/Pagination';
import TopicItem from './TopicItem';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function SearchPage() {
    const [cards, setCards] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [loading, setLoading] = useState(false);
    const location = useLocation().pathname;
    useTitle('Search');

    const [topic, setTopic] = useState(searchParams.get('topic') || 'All');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setSearchParams({ topic, page });
        const fetchApi = async () => {
            setLoading(true);
            const result = await blogService.getBlogs({ topic, page });
            setCards(result);
            setLoading(false);
        };
        fetchApi();
    }, [page, topic, searchParams, location]);

    const handleClickTopic = useCallback(
        (topic) => {
            setTopic(topic);
            setPage(1);
            setSearchParams({ topic, page });
        },
        [topic],
    );

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
                            <TopicItem
                                key={index}
                                className={cx({ active: topic === key })}
                                topic={key}
                                onClickTopic={handleClickTopic}
                            />
                        );
                    })}
                </div>
            </div>

            <div className={cx('list')}>
                {!loading ? (
                    cards &&
                    cards.map((card, index) => {
                        return <Card key={index} className={cx('card')} blog={card}></Card>;
                    })
                ) : (
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                )}
            </div>

            <div className={cx('pagination')}>
                <Pagination value={page} setValue={setPage} />
            </div>
        </div>
    );
}

export default SearchPage;
