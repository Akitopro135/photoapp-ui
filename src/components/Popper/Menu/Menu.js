import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '~/components/Icons';
import config from '~/config';

const cx = classNames.bind(styles);

function Menu({ showResult, setShowResult, children }) {
    return (
        <>
            <Tippy
                interactive
                visible={showResult === 'more'}
                placement="bottom-end"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('more-tippy')}>
                                <Link to={config.routes.topic({ topicIdOrSlug: '' })} className={cx('topic-btn')}>
                                    Topics
                                </Link>
                                <Link to={config.routes.collection('')} className={cx('collection-btn')}>
                                    Collections
                                </Link>
                                <button className={cx('trend-btn')}>Trends</button>
                                <button className={cx('stats-btn')}>Stats</button>
                                <div className={cx('another-link')}>
                                    <a
                                        href="https://twitter.com/unsplash?utm_medium=referral&utm_source=unsplash"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <TwitterIcon />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/unsplash/?utm_medium=referral&utm_source=unsplash"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FacebookIcon />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/unsplash/?utm_medium=referral&utm_source=unsplash"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <InstagramIcon />
                                    </a>
                                </div>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => {
                    setShowResult('');
                }}
            >
                {children}
            </Tippy>
        </>
    );
}

export default Menu;
