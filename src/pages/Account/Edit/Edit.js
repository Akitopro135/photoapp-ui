import classNames from 'classnames/bind';
import styles from './Edit.module.scss';

import { useCurrentUser } from '~/unsplash/hooks';
import { useEffect, useState } from 'react';
import { scrollToTop } from '~/helpers';
import { Loading } from '~/components/Loading';
import { useResize, useValueChange } from '~/hooks';

const cx = classNames.bind(styles);

function Account() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [location, setLocation] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [instagram, setInstagram] = useState('');
    const [bio, setBio] = useState('');

    const { changeStyle } = useResize({ size: 69 });

    const { data, update } = useCurrentUser();

    const { length: bioLength, handleChange: handleChangeBio } = useValueChange({
        value: bio,
        set: setBio,
        maxLength: 250,
    });

    useEffect(() => {
        if (!data) return;
        const initialData = {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            userName: data.username,
            location: data.location,
            portfolio: data.portfolio_url,
            instagram: data.instagram_username,
            bio: data.bio,
        };

        data.first_name && setFirstName(initialData.firstName);
        data.last_name && setLastName(initialData.lastName);
        data.email && setEmail(initialData.email);
        data.username && setUserName(initialData.userName);
        data.location && setLocation(initialData.location);
        data.portfolio_url && setPortfolio(initialData.portfolio);
        data.instagram_username && setInstagram(initialData.instagram);
        data.bio && setBio(initialData.bio);
    }, [data]);

    const handleUpdate = async () => {
        await update({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim(),
            username: userName.trim(),
            location: location.trim(),
            url: portfolio.trim(),
            instagram_username: instagram.trim(),
            bio: bio.trim(),
        });
        scrollToTop();
    };

    if (!data) {
        return <Loading />;
    } else {
        return (
            <>
                <div className={cx('wrapper', changeStyle && 'change-text')}>
                    <h1>Edit profile</h1>
                    <div className={cx('user', changeStyle && 'change-style')}>
                        <div className={cx('image', changeStyle && 'change-style')}>
                            <img src={data.profile_image.large} alt="ProfileImage" className={cx('profile-image')} />
                        </div>
                        <div className={cx('profile', changeStyle && 'change-style')}>
                            <div className={cx('profile-name', changeStyle && 'change-style')}>
                                <div>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name.."
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your last name.."
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('email')}>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        placeholder="Your email.."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('username')}>
                                <div>
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        placeholder="Username.."
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1>About</h1>
                    <div className={cx('about')}>
                        <div className={cx('location')}>
                            <div>
                                <label>Location</label>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                        </div>
                        <div className={cx('portfolio')}>
                            <div>
                                <label>Portfolio</label>
                                <input type="text" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                            </div>
                        </div>
                        <div className={cx('instagram')}>
                            <div>
                                <label>Instagram username</label>
                                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                            </div>
                        </div>
                        <div className={cx('bio')}>
                            <div>
                                <label>Bio</label>
                                <div className={cx('div-textarea')}>
                                    <textarea type="text" value={bio} onChange={(e) => handleChangeBio(e)} />
                                    <span className={cx('char-count', bioLength === 0 ? 'char-count-error' : '')}>
                                        {bioLength}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={cx('btn-update')} onClick={handleUpdate}>
                        Update account
                    </button>
                </div>
            </>
        );
    }
}

export default Account;
