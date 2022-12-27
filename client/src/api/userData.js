const getUser = async (token) => {
    return fetch('http://localhost:5500/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    }).then(response => response.json());
}

export default getUser;