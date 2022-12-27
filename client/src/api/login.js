const login = async (input) => {
    return fetch('http://localhost:5500/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    }).then(response => response.json())
    .then(data => {
        if(data.message) return false;
        return data.token;
    });
}
export default login;