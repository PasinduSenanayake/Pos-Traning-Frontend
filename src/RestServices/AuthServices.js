import {setAuthentication} from "../Util/Auth/AuthTokenManager";

const logOut = async ()=>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };
    // body: JSON.stringify({username: 'testU123', password: 'catWoman' })

    await fetch("http://localhost:8080/api/auth/signOut", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'post',
        body: JSON.stringify({ })

    }).then((responseData)=> {
        response['status'] = responseData['status']
    }).catch( function(error) {
        response['status'] = 280;
        console.log(error)
    });
    if(response['status']===200){
        setAuthentication(false);
    }

    return response;
};



const authenticate = async (userName, password)=>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };
    // body: JSON.stringify({username: 'testU123', password: 'catWoman' })

    await fetch("http://localhost:8080/api/auth/signIn", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'post',
        body: JSON.stringify({username: userName, password: password })

    }).then((fetchResponse)=> {
        let auth = false;
        if(fetchResponse['status']===200){
            auth = true;
            response['status'] =200;
        }
        setAuthentication(auth);

    }).catch( function(error) {
        response['status'] = 280;
        console.log(error)
    });

    if(response['status']===120){
        response['status'] = 401;
    }

    return response;
};



export {
    logOut,
    authenticate
}

//status code :120 => not implemented
//status code :200 => Success
//status code :401 => Unauthorized
//status code :280 => no connection