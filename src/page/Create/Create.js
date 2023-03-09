import { useState } from 'react';
import { useAutoResize } from '~/hooks';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
import { ExForm, ExForm1 } from '~/components/ExForm';
import Button from '~/components/Button';
import uniqid from 'uniqid';
import { useEffect } from 'react';
import axios from 'axios';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function Create() {
    const [listForm, setListForm] = useState([{ id: uniqid(), person1: '', person2: '', type: 'form1' }]);

    const [showImages, setShowImages] = useState(false);
    const [listImage, setListImage] = useState([]);
    const [thumb, setThumb] = useState('');
    const [description, setDescription] = useState('');

    const desRef = useAutoResize(description);

    // Handle Comunication Form
    useEffect(() => {
        axios('http://localhost:3000/images/avatar/avatars.json')
            .then((res) => {
                const data = res.data;
                console.log(data);

                setListImage(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAdd = () => {
        setListForm((pre) => [...pre, { id: uniqid(), person1: '', person2: '', type: 'form1' }]);
    };

    const handleAdd1 = () => {
        setListForm((pre) => [...pre, { id: uniqid(), text: '', type: 'form2' }]);
    };

    const handleOnChange = (id, e) => {
        let newFormValues = [...listForm];
        const index = newFormValues.findIndex((form) => form.id === id);
        newFormValues[index][e.target.name] = e.target.value;
        setListForm(newFormValues);
    };

    const handleDelete = (id, ref) => {
        const newForms = listForm.filter((form) => form.id !== id);
        setListForm(newForms);
    };

    const handleSubmit = () => {
        setListForm([{ id: uniqid(), person1: '', person2: '', type: 'form1' }]);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Create New Grammar</h2>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('img-select')}>
                        <div
                            className={cx('image')}
                            style={thumb ? { border: 'none', backgroundColor: 'transparent' } : {}}
                        >
                            {!thumb ? (
                                <Button text onClick={() => setShowImages(true)}>
                                    Chọn ảnh bìa
                                </Button>
                            ) : (
                                <img src={thumb} className={cx('thumb')} onClick={() => setShowImages(true)} />
                            )}
                        </div>
                    </div>
                    <div className={cx('form')}>
                        <label className={cx('label')}>
                            Grammar Title *  {' '}
                            <input type="text" className={cx('title-input')} placeholder="- ㄴ/는 ........" />
                        </label>
                        <label className={cx('label')}>
                            Description  {' '}
                            <textarea
                                ref={desRef}
                                placeholder="Mô tả về ngữ pháp"
                                className={cx('description')}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                {listForm.map((form, index) => {
                    if (form.type === 'form1') {
                        return (
                            <ExForm
                                key={index}
                                id={form.id}
                                value1={form.person1}
                                value2={form.person2}
                                onDelete={handleDelete}
                                handleOnChange={handleOnChange}
                            />
                        );
                    } else if (form.type === 'form2') {
                        return (
                            <ExForm1
                                key={index}
                                id={form.id}
                                value={form.text}
                                onDelete={handleDelete}
                                handleOnChange={handleOnChange}
                            />
                        );
                    }
                })}

                <div className={cx('add-block')}>
                    <span className={cx('add')} onClick={handleAdd}>
                        + THẺ ĐÔI
                    </span>
                    <span className={cx('add')} onClick={handleAdd1}>
                        + THẺ ĐƠN
                    </span>
                </div>
            </div>

            <div className={cx('btn-block')}>
                <Button onClick={handleSubmit} yellow>
                    Tạo
                </Button>
            </div>

            {showImages && (
                <div className={cx('overlay')} onClick={() => setShowImages(false)}>
                    <div className={cx('img-list')} onClick={(e) => e.stopPropagation()}>
                        {listImage.map((img, key) => {
                            return (
                                <Image
                                    key={key}
                                    src={img.link}
                                    className={cx('img')}
                                    onClick={() => {
                                        setThumb(img.link);
                                        setShowImages(false);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Create;
