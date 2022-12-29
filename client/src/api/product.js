const productAPI = {
    async addProduct(input) {
        return fetch('http://localhost:5500/api/product/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 201;
        });
    },
    async sellProduct(input) {
        return fetch(`http://localhost:5500/api/product/sell`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 500;
        });
    },
    async guaranteeProduct(input) {
        return fetch(`http://localhost:5500/api/product/guarantee`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 500;
        });
    },
    async distributeProduct(input) {
        return fetch(`http://localhost:5500/api/product/distribute`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 500;
        });
    },
    async receiveProducts(input) {
        return fetch(`http://localhost:5500/api/product/receiveFromFactory`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 500;
        });
    },
    async givebackProduct(input) {
        return fetch(`http://localhost:5500/api/product/giveback`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(response => {
            return response.status == 500;
        });
    },
    async getQuantity(id) {
        return fetch(`http://localhost:5500/api/product/quantity/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },
    async getProduct(id) {
        return fetch(`http://localhost:5500/api/product/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },
    async getErrorProduct(id) {
        return fetch(`http://localhost:5500/api/product/error/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },
    async getProductDetail(imei) {
        return fetch(`http://localhost:5500/api/product/detail/${imei}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    },
}

export default productAPI;