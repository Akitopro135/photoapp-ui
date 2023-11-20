import classNames from 'classnames/bind';
import styles from './CollectionForm.module.scss';
import { LockIcon } from '~/components/Icons';
import { useValueChange } from '~/hooks';

const cx = classNames.bind(styles);

function CollectionForm({ title, name, setName, description, setDescription, checkbox, setCheckbox, children }) {
    const { length: lengthName, handleChange: handleChangeName } = useValueChange({
        value: name,
        set: setName,
        maxLength: 10,
    });

    const { length: lengthDescription, handleChange: handleChangeDescription } = useValueChange({
        value: description,
        set: setDescription,
        maxLength: 250,
    });

    return (
        <>
            <span>{title}</span>
            <div className={cx('name')}>
                <label>Name</label>
                <div className={cx('div-input')}>
                    <input
                        type="text"
                        placeholder="Name Collection..."
                        value={name}
                        onChange={(e) => handleChangeName(e)}
                    />
                    <span className={cx('char-count', lengthName === 0 ? 'char-count-error' : '')}>{lengthName}</span>
                </div>
            </div>
            <div className={cx('description')}>
                <label>Description</label>
                <div className={cx('div-textarea')}>
                    <textarea
                        type="text"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
                    />
                    <span className={cx('char-count', lengthDescription === 0 ? 'char-count-error' : '')}>
                        {lengthDescription}
                    </span>
                </div>
            </div>
            <div className={cx('check-box')}>
                <input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
                <label>
                    Make collection private <LockIcon />
                </label>
            </div>
            <div className={cx('action-btn')}>{children}</div>
        </>
    );
}

export default CollectionForm;
