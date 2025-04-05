import axiosObj from 'axios';

axiosObj.get("http://127.0.0.1:3000/cart")
.then(response => {
    console.log("Cart:", response.data);
})
.catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
});