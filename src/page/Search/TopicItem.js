import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(styles);

function TopicItem({ className, topic, onClickTopic }) {
    return (
        <p className={cx('topic', { [className]: className })} onClick={() => onClickTopic(topic)}>
            {topic}
        </p>
    );
}

export default memo(TopicItem);
