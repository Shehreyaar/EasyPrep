import axiosObj from 'axios';

axiosObj.post("http://127.0.0.1:3000/cart", 
    {mealId: 0, quantity: 2}
)
.then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
;