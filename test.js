const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwidXNlcl9lbWFpbCI6ImhpcmFkdW9uZzEyM0BnbWFpbC5jb20iLCJ1c2VyX3RlbGVwaG9uZSI6IjEyMzQ1Njc4OSIsInVzZXJfcm9sZSI6Im5vcm1hbCIsImlhdCI6MTcyMTM0NjUyNiwiZXhwIjoxNzIyNjQyNTI2fQ.uMfE7SPV-6sKsJqaJVNeElYRhl9oVMrs4bBsxVnjWHk';
const adminToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwidXNlcl9lbWFpbCI6ImR1b25nQGdtYWlsLmNvbSIsInVzZXJfdGVsZXBob25lIjoiMTIzNDU2NzgwMSIsInVzZXJfcm9sZSI6ImFkbWluIiwiaWF0IjoxNzIxMjQ0NjU4LCJleHAiOjE3MjI1NDA2NTh9.gWE-2TNKB8wNRHoMUN3Gmj7HlpRLewVrIGIlpUrHs80';
const token2 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwidXNlcl9lbWFpbCI6ImhpcmFkdW9uZzEyM0BnbWFpbC5jb20iLCJ1c2VyX3RlbGVwaG9uZSI6IjEyMzQ1Njc4OSIsInVzZXJfcm9sZSI6Im5vcm1hbCIsImlhdCI6MTcyMTI5NTc2OCwiZXhwIjoxNzIyNTkxNzY4fQ.V0k6UOqkOdE2Ep-njg0rgf7ulRViYeQPmWlTX1B-pN0';
const body = {
    user_email: 'admin@gmail.com',
    user_telephone: '084111111',
    user_avt: '/users/avt/avt.jpg',
};
// token  id = 11
// token2 id = 10
const shop = {
    user_id: 11,
    shop_name: 'Shop ABC',
    shop_address: '123 ABC Street, City ABC',
    shop_description: 'Shop ABC description',
    shop_start_at: '2015-03-25',
};

const merchandise = {
    merchandise_name: 'Fantastic Rubber Ball',
    merchandise_price: 49.99,
    merchandise_description: 'A high-quality rubber ball perfect for all ages.',
    shop_id: 2,
    merchandise_in_stock_quantity: 500,
    // merchandise_sold_quantity: 150,
    merchandise_img: 'http://placeimg.com/640/480/tech',
};

const fetchRequest = async () => {
    try {
        const response = await fetch(
            'http://localhost:3000/api/v1/shops/create',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(shop),
            },
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}, message: ${data.message}`,
            );
        }
        return data;
    } catch (error) {
        console.error(
            'There has been a problem with your fetch operation:',
            error.message,
        );
    }
};

fetchRequest().then((data) => {
    data ? console.log(data) : console.log('Error');
});
