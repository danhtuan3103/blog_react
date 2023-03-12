import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '../Wrapper';
import ShareBox from './ShareBox';
import Image from '~/components/Image';
import { FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import copyTextToClipboard from '~/helper/coppyClipboard';
import images from '~/assets/images';
import { memo, useCallback, useState } from 'react';
const cx = classNames.bind(styles);

function CardHeader({
    isBookmarked,
    onClickUser,
    onClickBookMark,
    onClickShare,
    avatar,
    author,
    className,
    time,
    blogId,
}) {
    const classes = cx('header', {
        className: [className],
        time,
    });
    const [visible, setVisible] = useState(false);

    const handleShare = (e) => {
        onClickShare(e);
        setVisible(true);
    };

    const handleClickCopy = () => {
        copyTextToClipboard(`${window.location.origin}/blog/${blogId}`);
    };

    const SHARE_MENU = [
        {
            title: 'Chia sẻ lên facebook',
            icon: FaFacebook,
            to: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                `${window.location.origin}/blog/${blogId}`,
            )}`,
        },
        {
            title: 'Chia sẻ lên Email',
            icon: MdEmail,
            to: `mailto:?body=${encodeURIComponent(`${window.location.origin}/blog/${blogId}`)}`,
        },
        {
            title: 'Sao chép link liên kêt',
            icon: BiLink,
            fn: handleClickCopy,
        },
    ];

    const handleClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <div className={classes}>
            <div className={cx('user')} onClick={onClickUser}>
                <Image className={cx('avatar')} src={avatar} alt="name" fallBack={images.fallbackAvatar} />
                <div className={cx('blog-info')}>
                    <span className={cx('author')}>{author}</span>
                    {time && <span className={cx('date')}>{time}</span>}
                </div>
            </div>

            <div className={cx('icon-box')}>
                <span className={cx('icon-wrap')} onClick={onClickBookMark}>
                    {isBookmarked ? (
                        <BsBookmarkFill className={cx('icon', 'active')} />
                    ) : (
                        <BsBookmark className={cx('icon')} />
                    )}
                </span>
                <Tippy
                    visible={visible}
                    interactive
                    placement="bottom-end"
                    onClickOutside={() => setVisible(false)}
                    render={(atts) => (
                        <div {...atts}>
                            <Wrapper>
                                <ShareBox menu={SHARE_MENU} onClose={handleClose}></ShareBox>
                            </Wrapper>
                        </div>
                    )}
                >
                    <span className={cx('icon-wrap')} onClick={handleShare}>
                        <BiDotsHorizontalRounded className={cx('icon')} />
                    </span>
                </Tippy>
            </div>
        </div>
    );
}

export default memo(CardHeader);
