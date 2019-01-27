
import {mapItem} from "../Util/Support/Mappers"

const getAllOrders = async () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };



    let fetchResponse = await fetch("http://localhost:8080/api/order/getAllOpenOrders", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials: "include",
        method: 'get',

    }).then((responseData)=>{
        response['status'] = responseData['status'];
        return responseData;

    }).catch((error)=> {
            response['status'] = 280;
            response['error'] = error;
        }
    );
    if(response['status']===200){
         await fetchResponse.json().then(data=>{
            response['content'] = data;
        });
    }

    return response;

};

const getOrder = async (orderId) =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    let fetchResponse = await fetch("http://localhost:8080/api/order/getOrder?orderId="+orderId, {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'get',

    }).then((responseData)=> {
        response['status'] =responseData['status'];
        return responseData;

    }).catch( function(error) {
        response['status'] = 280;
        response['error'] = error;
    });
    if(response['status']===200){
        await  fetchResponse.json().then((value) => {
            response['content'] = value;
        })
    }

    return response

};


const getAllItems = async () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    let fetchResponse =await fetch("http://localhost:8080/api/item/all", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'get',

    }).then((responseData)=> {
        response['status'] =responseData['status'];
        return responseData;


    }).catch( function(error) {
        response['status'] = 280;
        console.log(error)
    });
    if(response['status']===200){
        await  fetchResponse.json().then((value) => {
            response['content'] = value;
        });
        response['content'] = response['content'].map(mapItem);
    }
    return response

};




export {
    getAllOrders,
    getAllItems,
    getOrder

}

//status code :120 => not implemented
//status code :200 => Success
//status code :401 => Unauthorized
//status code :280 => no connection
//status code :500 => server error
