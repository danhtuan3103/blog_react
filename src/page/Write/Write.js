import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Write.module.scss';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import MDEditor, { commands } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useAutoResize } from '~/hooks';
import Model from '~/components/Model/Model';
import Export from './Export';
import { blogService } from '~/services';
const cx = classNames.bind(styles);

function Write() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [topic, setTopic] = useState('');
    const [model, setModel] = useState(false);
    const { user, theme } = useSelector((state) => state);

    const resize = useAutoResize(title);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title || 'Write somthing';
    }, [title]);

    const handleChangeThumbnail = useCallback((e) => {
        setThumbnail(e.target.value);
    }, []);

    const handleChangeTopic = useCallback((e) => {
        setTopic(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        const data = { title, content, thumbnail, topic, author: user._id };
        if (!topic) {
            alert('Hãy nhập ít nhất 1 topic');
            return;
        }
        const fetchAPI = async () => {
            const result = await blogService.createBlog({ data });
            navigate('/blog/' + result._id);
        };
        fetchAPI();
    }, [title, content, thumbnail, topic, user._id]);

    const handleCloseModel = useCallback(() => {
        setModel(false);
    }, []);

    const handleExport = () => {
        if (title.length < 10) {
            alert('Tiêu đề phải lớn hơn 10 kí tự');
            return;
        }

        if (content.length < 100) {
            alert('Tiêu đề phải lớn hơn 100 kí tự');
            return;
        }
        setModel(true);
    };
    return (
        <div className={cx('wrapper')}>
            <textarea
                ref={resize}
                className={cx('title')}
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <div className={cx('editor')} data-color-mode={theme}>
                {/* <div className="wmde-markdown-var"> </div> */}
                <MDEditor
                    height={600}
                    visibleDragbar={false}
                    value={content}
                    textareaProps={{
                        placeholder: 'Viết nội dung ở đây .... ',
                    }}
                    className={cx('editorr')}
                    onChange={setContent}
                    highlightEnable={true}
                    placeholder="Write content at here"
                    autoFocus={true}
                    commands={[
                        // Custom Toolbars
                        commands.group(
                            [
                                commands.title1,
                                commands.title2,
                                commands.title3,
                                commands.title4,
                                commands.title5,
                                commands.title6,
                            ],
                            {
                                name: 'title',
                                groupName: 'title',
                                buttonProps: { 'aria-label': 'Insert title' },
                            },
                        ),
                        commands.bold,
                        commands.italic,
                        commands.strikethrough,
                        commands.hr,
                        commands.orderedListCommand,
                        commands.unorderedListCommand,
                        commands.code,
                        commands.codeBlock,
                        commands.quote,
                        commands.link,
                        commands.image,
                        commands.getCommands,
                        commands.getExtraCommands,
                        commands.getStateFromTextArea,
                    ]}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: '10px 20px',
                }}
            >
                <Button yellow onClick={handleExport}>
                    Xuất bản
                </Button>
            </div>

            {model && (
                <Model onBack={handleCloseModel}>
                    <Export
                        topic={topic}
                        onTopic={handleChangeTopic}
                        thumbnail={thumbnail}
                        onThumbnail={handleChangeThumbnail}
                        onSubmit={handleSubmit}
                    />
                </Model>
            )}
        </div>
    );
}

export default Write;
