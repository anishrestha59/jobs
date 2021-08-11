
export function getCurrentUser(){
    const user = localStorage.getItem("UserData");
    const parsedData = JSON.parse(user);//converting string json to object
    if(parsedData) return(parsedData); 
    else return null;

}



//to use as object in the imported part auth.getUser can be used
export default { getCurrentUser };