import styles from './SlideShow.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Button from '../Button';
import { SVGteamsit, SpeedTest, Innivation, ShareLink, NewPaper } from '~/assets/images';
const cx = classNames.bind(styles);

const slide = [
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy ',
        bc: 'linear-gradient(to right, #a8c0ff, #3f2b96)',
        im: SVGteamsit,
    },
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy ',

        bc: 'linear-gradient(to right, #000000, #0f9b0f)',
        im: SpeedTest,
    },
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy ',

        bc: 'linear-gradient(to right, #20002c, #cbb4d4)',
        im: Innivation,
    },
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy ',

        bc: 'linear-gradient(to right, #076585, #fff)',
        im: ShareLink,
    },
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy ',

        bc: 'linear-gradient(to right, #799f0c, #acbb78)',
        im: NewPaper,
    },
];
function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = currentIndex <= slide.length - 1 ? currentIndex : 0;
    const preSlide = currentSlide === 0 ? slide.length - 1 : currentSlide - 1;
    const nextSlide = currentSlide === slide.length - 1 ? 0 : currentSlide + 1;

    const handleSlide = (index) => {
        const slides = document.querySelectorAll('[data-index]');
        let translateAmount = index * 100;
        let translate = 0;
        translate = translate -= translateAmount;

        slides.forEach((slide) => {
            slide.style.transform = `translate3d(${translate}%, 0 , 0)`;
        });
        setCurrentIndex(nextSlide);
    };

    useEffect(() => {
        const time = setTimeout(() => {
            handleSlide(nextSlide);
        }, 4000);
        return () => {
            clearTimeout(time);
        };
    }, [currentSlide]);
    return (
        <div className={cx('wrapper')}>
            <span
                className={cx('btn', 'pre')}
                onClick={() => {
                    handleSlide(preSlide);
                }}
            >
                <IoIosArrowBack className={cx('icon')} />
            </span>
            <span className={cx('btn', 'next')}>
                <IoIosArrowForward
                    className={cx('icon')}
                    onClick={() => {
                        handleSlide(nextSlide);
                    }}
                />
            </span>

            <div className={cx('slides')}>
                {slide.map((sl, index) => {
                    let Comp = sl?.im;
                    return (
                        <div
                            className={cx('slide')}
                            key={index}
                            style={{
                                background: sl.bc,
                            }}
                            ng
                            data-index={index}
                        >
                            <div className={cx('intro')}>
                                <Comp className={cx('img')} />
                                <h3 className={cx('text')}>{sl.text}</h3>

                                <Button primary className={cx('center-btn')}>
                                    Tìm hiểu thêm
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={cx('dot-box')}>
                {slide.map((sl, index) => {
                    return (
                        <span
                            key={index}
                            className={cx('dot', index === currentIndex ? 'dot-active' : '')}
                            onClick={() => {
                                handleSlide(index);
                                setCurrentIndex(index);
                            }}
                        ></span>
                    );
                })}
            </div>
        </div>
    );
}

export default SlideShow;
