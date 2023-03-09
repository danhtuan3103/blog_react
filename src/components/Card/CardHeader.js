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
const cx = classNames.bind(styles);

const SHARE_MENU = [
    {
        title: 'Chia sẻ lên facebook',
        icon: FaFacebook,
        to: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
            'https://fullstack.edu.vn/blog/on-lai-kien-thuc-javascript-phan-2.html',
        )}`,
    },
    {
        title: 'Chia sẻ lên Email',
        icon: MdEmail,
        to: `mailto:?body=${encodeURIComponent(
            'https://fullstack.edu.vn/blog/on-lai-kien-thuc-javascript-phan-2.html',
        )}`,
    },
    {
        title: 'Sao chép link liên kêt',
        icon: BiLink,
        fn: copyTextToClipboard,
    },
];

function CardHeader({ isBookmarked, onClickUser, onClickBookMark, onClickShare, avatar, author, className, time }) {
    const classes = cx('header', {
        className: [className],
        time,
    });
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
                    interactive
                    trigger="click"
                    placement="bottom-end"
                    hideOnClick={true}
                    render={(atts) => (
                        <div {...atts}>
                            <Wrapper>
                                <ShareBox menu={SHARE_MENU}></ShareBox>
                            </Wrapper>
                        </div>
                    )}
                >
                    <span className={cx('icon-wrap')} onClick={onClickShare}>
                        <BiDotsHorizontalRounded className={cx('icon')} />
                    </span>
                </Tippy>
            </div>
        </div>
    );
}

export default CardHeader;
