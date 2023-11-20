import { useState } from 'react';

function useValueChange({ value, set, maxLength }) {
    const [length, setLength] = useState(maxLength - value.length);

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            set(e.target.value);
            setLength(maxLength - e.target.value.length);
        }
    };

    return { handleChange, length };
}

export default useValueChange;
