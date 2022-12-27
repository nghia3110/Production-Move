const signup = async (input) => {
    return fetch('http://localhost:5500/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    }).then(response => {
        return response.status == 201;
    });
}

export default signup;