
const updateOrderItem = async (orderUpdate) =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };
    let fetchedResponse = {};

    await fetch("http://localhost:8080/api/order/update", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'post',
        body: JSON.stringify(orderUpdate)

    }).then((fetchResponse)=> {

        if(fetchResponse['status']===200){
            fetchedResponse = fetchResponse;
            response['status'] =200;
        }


    }).catch( function(error) {
        response['status'] = 280;
        console.log(error)
    });

    if(response['status']===200){
        response['content'] = await fetchedResponse.json();
    }
    else if(response['status']===120){
        response['status'] = 401;
    }

    return response
};

const createNewOrder = async () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };
    let fetchedResponse = {};

    await fetch("http://localhost:8080/api/order/create", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'get',

    }).then((fetchResponse)=> {

        if(fetchResponse['status']===200){
            fetchedResponse = fetchResponse;
            response['status'] =200;
        }


    }).catch( function(error) {
        response['status'] = 280;
        console.log(error)
    });

    if(response['status']===200){
        response['content'] = await fetchedResponse.json();
    }
    else if(response['status']===120){
        response['status'] = 401;
    }

    console.log(response)

    return response

};


const deleteOrderData = (orderData) =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

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