import { useEffect, useState } from 'react';
import unsplash from '..';
import { UpdateUserProfieParams } from '../params/current_user';

function useCurrentUser() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getUserInfo = () => {
        if (loading) return;
        setLoading(true);

        unsplash.current_user
            .get()
            .then((data) => {
                setData(data);
                localStorage.setItem('currentId', data.username);
            })
            .catch((error) => {
                console.log('Current User Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    const update = (currentUserInput = UpdateUserProfieParams) => {
        if (!data) return;
        else {
            unsplash.current_user
                .update({
                    ...UpdateUserProfieParams,
                    ...currentUserInput,
                })
                .then((data) => {
                    data.first_name = currentUserInput.first_name;
                    data.last_name = currentUserInput.last_name;
                    data.email = currentUserInput.email;
                    data.username = currentUserInput.username;
                    data.location = currentUserInput.location;
                    data.portfolio_url = currentUserInput.url;
                    data.instagram_username = currentUserInput.instagram_username;
                    data.bio = currentUserInput.bio;
                })
                .catch((error) => console.error('Update Current User Error: ', error))
                .finally(alert('Update success'));
        }
    };

    useEffect(() => {
        if (localStorage.getItem('currentId') !== data?.username) {
            console.log('vo');
            getUserInfo();
        }
    }, []);

    return { data, update, loading, error };
}

export default useCurrentUser;
