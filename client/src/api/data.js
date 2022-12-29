const dataAPI = {
    async allUser() {
        return fetch('http://localhost:5500/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => data.length);
    },

    async allProduct() {
        return fetch('http://localhost:5500/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => data.length);
    },

    async allProductLine() {
        return fetch('http://localhost:5500/api/product/count/productline', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => data.length);
    },

    async countProductByStatus() {
        return fetch('http://localhost:5500/api/product/count/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },

    async countProductByFactory() {
        return fetch('http://localhost:5500/api/product/count/factory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },

    async countProductByAgency() {
        return fetch('http://localhost:5500/api/product/count/agency', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },

    async countProductByGuarantee() {
        return fetch('http://localhost:5500/api/product/count/guarantee', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },

    async getAllUser() {
        return fetch('http://localhost:5500/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    }
}


export default dataAPI;