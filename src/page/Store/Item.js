import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '~/components/Wrapper';
import Button from '~/components/Button';
import { timeCaculate } from '~/helper';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '~/auth/redux/actions';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Item({ bookmark, handleDelete }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDeleteItem = (id) => {
        handleDelete(id);
        dispatch(addToast({ type: 'toast-info', mess: 'Xóa vào mục đã lưu' }));
        setVisible(false);
    };

    const handleClickBlog = (id) => {
        navigate('/blog/' + id);
    };
    return (
        <div className={cx('card')}>
            <div className={cx('card-top')}>
                <h4 className={cx('card-title')} onClick={() => handleClickBlog(bookmark?.blog_id?._id)}>
                    {bookmark?.blog_id?.title}
                </h4>
                <Tippy
                    visible={visible}
                    interactive
                    offset={[0, -10]}
                    onClickOutside={() => setVisible(false)}
                    placement="bottom-end"
                    render={(attr) => {
                        return (
                            <div {...attr}>
                                <Wrapper className={cx('tippy')}>
                                    <Button
                                        className={cx('delete-btn')}
                                        onClick={(e) => handleDeleteItem(bookmark?.blog_id?._id)}
                                    >
                                        Xoa khoi muc da luu
                                    </Button>
                                </Wrapper>
                            </div>
                        );
                    }}
                >
                    <span className={cx('tool-icon')} onClick={() => setVisible(true)}>
                        <BsThreeDots className={cx('icon')} />
                    </span>
                </Tippy>
            </div>
            <div className={cx('card-bottom')}>
                <span className={cx('card-time')}>Đã lưu {timeCaculate(bookmark.createdAt)}</span>
                <span className={cx('dot')}>.</span>
                <span className={cx('author')}>
                    Tác giả <strong>{bookmark?.blog_id.author.username}</strong>
                </span>
            </div>
        </div>
    );
}

export default memo(Item);
