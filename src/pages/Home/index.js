import Tippy from '@tippyjs/react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [visible, setVisible] = useState(true);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    return (
        <div>
            <Tippy content="Tooltip" visible={visible} onClickOutside={hide}>
                <div className={cx('wrapper')}>
                    <button onClick={visible ? hide : show}>Reference</button>
                </div>
            </Tippy>
        </div>
    );
}

export default Home;
