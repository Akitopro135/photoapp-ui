import classNames from 'classnames/bind';
import styles from './Edit.module.scss';

import config from '~/config';
import { useUser } from '~/unsplash/hooks';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Account() {
    const { data } = useUser({
        username: localStorage.getItem('currentId'),
    });

    //console.log(data);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [location, setLocation] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [instagram, setInstagram] = useState('');
    const [bio, setBio] = useState('');

    console.log(data);

    useEffect(() => {
        if (!data) return;
        const initialData = {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
        };

        setFirstName(initialData.firstName);
        setLastName(initialData.lastName);
    }, [data]);

    // const check = () => {
    //     if (localStorage.getItem('currentId') === null) {
    //         return (window.location = config.routes.home);
    //     } else {
    //         return true;
    //     }
    // };

    const shouldRender = localStorage.getItem('currentId') !== null;

    if (!shouldRender) {
        // Chuyển hướng trang khi không thỏa mãn điều kiện
        window.location = config.routes.home;
        return null; // Tránh hiển thị nội dung khi chuyển hướng
    }

    const handleUpdate = () => {
        console.log(firstName);
    };

    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    <h1>Edit profile</h1>
                    <div className={cx('user')}>
                        <div className={cx('image')}>
                            <img src={data.profile_image.large} alt="ProfileImage" className={cx('profile-image')} />
                        </div>
                        <div className={cx('profile')}>
                            <div className={cx('profile-name')}>
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
                                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleUpdate}>Click</button>
                </div>
            )}
        </>
    );
}

export default Account;
