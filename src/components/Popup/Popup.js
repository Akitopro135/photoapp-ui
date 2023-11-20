import classNames from 'classnames/bind';
import styles from './Popup.module.scss';
import { CloseIcon } from '../Icons';

const cx = classNames.bind(styles);

function Popup({ children, expectedPopup, itemPopup, setPopupVisible, changeStyle = false }) {
    return (
        <>
            {expectedPopup && itemPopup === expectedPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-wrapper', changeStyle && 'changeStyle')}>{children}</div>
                    <button
                        className={cx('popup-btn-close', changeStyle && 'change-btn')}
                        onClick={() => setPopupVisible('')}
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
        </>
    );
}

export default Popup;
