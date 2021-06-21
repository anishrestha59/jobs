
function checkUser( { user } ){

           let value;
           if(user.hasOwnProperty('companyname')){
               value = "company";
           }else if(user.hasOwnProperty('seekername')){
               value = "seeker";
           }else{
               value = "not signed in"
           }
           return(value);
       }
   
export default checkUser; 