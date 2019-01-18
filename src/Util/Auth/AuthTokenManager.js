
const isAuthenticated = ()=>{

    return (localStorage.getItem('posAuthentication')===null ? false : localStorage.getItem('posAuthentication') );
};

const setAuthentication = (isAuth) =>{
    localStorage.setItem('posAuthentication', isAuth);
};


export {
    isAuthenticated,
    setAuthentication
}