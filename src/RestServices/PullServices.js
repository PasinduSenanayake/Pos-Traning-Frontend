import {setAuthentication} from "../Util/Auth/AuthTokenManager";

const getDashboardItems = () =>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    return response

};

const authenticate = async (userName, password)=>{

    let response = {
        status : 120,
        content:{},
        error:{}
    };

    await fetch("http://localhost:8080/api/auth/signIn", {
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        credentials:"include",
        method: 'post',
        body: JSON.stringify({username: 'testU123', password: 'catWoman' })

    }).then((fetchResponse)=> {
        let auth = false;
        if(fetchResponse['status']===200){
           auth = true;
           response['status'] =200;
        }
        setAuthentication(auth);

    }, function(error) {
        setAuthentication(false);
        response['status'] =401;
        console.log(error)
    });

    return response;
  };



export {
    getDashboardItems,
    authenticate
}

//status code :120 => not implemented
//status code :200 => Success
//status code :401 => Unauthorized