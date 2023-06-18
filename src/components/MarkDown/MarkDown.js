import MarkdownIt from 'markdown-it';
import styles from './MarkDown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Markdown({ text = '', className }) {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const html = mdParser.render(text);

    return <div className={cx('wrapper', className)} dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export default Markdown;
