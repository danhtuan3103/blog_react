import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import styles from './Write.module.scss';
import Button from '~/components/Button';
import Model from '~/components/Model/Model';
import Export from './Export';
import { blogService } from '~/services';
import Markdown from '~/components/MarkDown/MarkDown';
import { useDebounce } from '~/hooks';
const cx = classNames.bind(styles);
const MAX_TITLE_LENGTH = 200;
function Write() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [topics, setTopics] = useState([]);
    const [model, setModel] = useState(false);
    const { user } = useSelector((state) => state);
    const inputRef = useRef(null);
    const deboundedValue = useDebounce(title, 2000);

    console.log(deboundedValue);

    function handleEditorChange({ text }) {
        setContent(text);
    }
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title || 'Write somthing';
    }, [title]);

    useEffect(() => {
        const input = inputRef.current;

        const handleKeydown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
            if (title.trim().length === MAX_TITLE_LENGTH) {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    return;
                }

                e.preventDefault();
            }
        };

        if (input) {
            input.addEventListener('keydown', handleKeydown);
        }

        return () => {
            if (input) {
                input.removeEventListener('keydown', handleKeydown);
            }
        };
    }, [title]);

    const handleInputChange = (e) => {
        const text = e.target.innerHTML;

        if (text.trim().length <= MAX_TITLE_LENGTH) {
            setTitle(text);
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();

        // Lấy nội dung đã được paste từ clipboard
        const pastedText = event.clipboardData.getData('text/plain');

        let text = title.concat(pastedText);

        if (text.length > 200) {
            text = text.substring(0, 200);
        }

        setTitle(text);

        // Dán nội dung vào div contenteditable
        document.execCommand('insertText', false, text);
    };

    const renderHTML = (text) => {
        return <Markdown text={text} />;
    };

    // Export
    const handleChangeThumbnail = useCallback((e) => {
        setThumbnail(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        const data = { title, content, thumbnail, topics: JSON.stringify(topics), author: user._id };
        if (!topics) {
            alert('Hãy nhập ít nhất 1 topic');
            return;
        }

        console.log(data);
        const fetchAPI = async () => {
            const result = await blogService.createBlog({ data });
            navigate('/blog/' + result._id);
        };
        fetchAPI();
    }, [title, content, thumbnail, topics, user._id]);

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
            <div className={cx('editor')}>
                <div
                    ref={inputRef}
                    className={cx('title-input')}
                    spellCheck={false}
                    contentEditable={true}
                    onPaste={handlePaste}
                    onInput={handleInputChange}
                    data-empty-text="Tiêu đề"
                ></div>
                <div className={cx('rmel-editor')}>
                    <MdEditor
                        style={{
                            marginBottom: '31px',
                            height: 'calc(100vh - 100px)',
                        }}
                        renderHTML={renderHTML}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>

            <div className={cx('export-btn')}>
                <Button yellow onClick={handleExport}>
                    Xuất bản
                </Button>
            </div>

            {model && (
                <Model onBack={handleCloseModel}>
                    <Export
                        topics={topics}
                        setTopics={setTopics}
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
