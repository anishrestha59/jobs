const currentdate = new Date();
var date = new Date(currentdate. getTime());
date.setHours(0, 0, 0, 0);

export function getDateFiltered(jobs){
    const datefilteredjobs = jobs.filter((job)=>{
        const deadlinestring = job.date.substring(0,10);
        const deadline = Date.parse(deadlinestring);
 
        if(deadline >= date){
          return job;
        }
      })
      return (datefilteredjobs);
}


//send date to this
export function checkDeadline(paramDate){
    const deadlinestring = paramDate.substring(0,10);
    const deadline = Date.parse(deadlinestring);

    if(deadline-date>107100000){
     return false;
    }
    else{
         return true;
    }
        }



//to use as object in the imported part auth.getUser can be used
export default { getDateFiltered, checkDeadline };