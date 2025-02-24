import React, { useEffect, useState } from 'react';

const Contact: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/contact')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Contact</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default Contact;
