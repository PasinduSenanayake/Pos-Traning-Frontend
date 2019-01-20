const isAuthenticated = () => {
    let isAuth = (localStorage.getItem('posAuthentication') === null ? false : localStorage.getItem('posAuthentication'));
    if (isAuth === "false") {
        isAuth = false;
    }
    return isAuth;
};

const setAuthentication = (isAuth) => {
    localStorage.setItem('posAuthentication', isAuth);
};


export {
    isAuthenticated,
    setAuthentication
}