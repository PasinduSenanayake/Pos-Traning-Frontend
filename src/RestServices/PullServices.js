
const getAllOrders = async () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    let fetchedResponse = {};

    await fetch("http://localhost:8080/api/order/allOpen", {
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
    return response;

};

const getOrder = async (orderId) =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    let fetchedResponse = {};

    await fetch("http://localhost:8080/api/order/getOrder?orderId="+orderId, {
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
    return response

};


const getAllItems = async () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    let fetchedResponse = {};
    await fetch("http://localhost:8080/api/item/all", {
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
        response['content'] = response['content'].map(mapItem);
    }
    else if(response['status']===120){
        response['status'] = 401;
    }
    return response

};



const mapItem =(item)=>{

    return {
        key:item['code'],
        text:item['name'],
        value:item['code']+'__'+item['unitPrice']
        }

}



export {
    getAllOrders,
    getAllItems,
    getOrder

}

//status code :120 => not implemented
//status code :200 => Success
//status code :401 => Unauthorized
//status code :280 => no connection