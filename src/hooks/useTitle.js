import { useEffect, useState } from 'react';

function useTitle(initialTitle = 'Blog') {
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return [title, setTitle];
}

export default useTitle;
