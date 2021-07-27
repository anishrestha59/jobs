
export function getCurrentUser(){
    const user = localStorage.getItem("UserData");
    if(user) return(user); 
    else return null;

}


//to use as object in the imported part auth.getUser can be used
export default { getCurrentUser };