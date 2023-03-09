import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Store.module.scss';

const cx = classNames.bind(styles);
function PostHeader({ types = [] }) {
    const params = useParams();
    const _type = params.type;

    const navigate = useNavigate();
    return (
        <div className={cx('header')}>
            {types.map((type, index) => {
                return (
                    <span
                        key={index}
                        className={cx('option', { active: type.active === _type })}
                        onClick={() => navigate(`/${type?.root}/${type.active}`)}
                    >
                        {type.title}{' '}
                    </span>
                );
            })}
        </div>
    );
}

export default PostHeader;
