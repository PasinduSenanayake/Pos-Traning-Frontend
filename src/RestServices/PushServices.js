const updateOrderItem = async (orderUpdate) => {

    let response = {
        status: 120,
        content: {},
        error: {}
    };
    let fetchedResponse = {};

    await fetch("http://localhost:8080/api/order/update", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'put',
        body: JSON.stringify(orderUpdate)

    }).then((fetchResponse) => {
        response['status'] = fetchResponse['status'];
        switch (fetchResponse['status']) {
            case 200:
                fetchedResponse = fetchResponse;
                break;
            default:
                break;
        }
    }).catch(function (error) {
        response['status'] = 280;
        console.log(error)
    });

    if (response['status'] === 200) {
        response['content'] = await fetchedResponse.json();
    }
    return response
};

const createNewOrder = async () => {

    let response = {
        status: 120,
        content: {},
        error: {}
    };

    let responseData = null;

    await fetch("http://localhost:8080/api/order/create", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'get',

    }).then((fetchResponse) => {
        response['status'] = fetchResponse['status'];

        switch (fetchResponse['status']) {
            case 200:
                responseData = fetchResponse;
                break;
            default:
                break;
        }

    }).catch(function (error) {
        response['status'] = 280;
        response['error'] = error;
    });

    if (responseData !== null) {
        await responseData.text().then((value) => {
            response['content'] = value;
        })
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

    }).then((fetchResponse) => {
        response['status'] = fetchResponse['status'];

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