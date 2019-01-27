const updateOrderItem = async (orderUpdate) => {

    let response = {
        status: 120,
        content: {},
        error: {}
    };


    let fetchResponse =   await fetch("http://localhost:8080/api/order/update", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'put',
        body: JSON.stringify(orderUpdate)

    }).then((responseData) => {
        response['status'] = responseData['status'];
        return responseData;

    }).catch(function (error) {
        response['status'] = 280;
        console.log(error)
    });
    if (response['status'] === 200) {
         await fetchResponse.json().then(data=>{response['content'] =data})
    }
    return response
};

const createNewOrder = async () => {

    let response = {
        status: 120,
        content: {},
        error: {}
    };



    let fetchResponse = await fetch("http://localhost:8080/api/order/create", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'post',

    }).then((responseData) => {
        response['status'] = responseData['status'];
        return responseData;


    }).catch(function (error) {
        response['status'] = 280;
        response['error'] = error;
    });

    if ( response['status']  === 200) {
       await fetchResponse.text().then(value=>{ response['content'] = value});
    }
    return response
};


const deleteOrderData = async (orderId) => {

    let response = {
        status: 120,
        content: {},
        error: {}
    };

  await fetch("http://localhost:8080/api/order/deleteOrder?orderId=" + orderId, {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'delete',

    }).then((responseData) => {
        response['status'] = responseData['status'];


    }).catch(function (error) {
        response['status'] = 280;
        response['error'] = error;
    });

    return response
};


export {
    createNewOrder,
    deleteOrderData,
    updateOrderItem
}

//status code :120 => not implemented
//status code :200 => Success
//status code :401 => Unauthorized
//status code :280 => no connection
//status code :500 => server error