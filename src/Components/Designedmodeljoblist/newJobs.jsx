import React, { Component } from 'react';

class newJobs extends Component {
    render() {
        return (
            <div>
                   <div class="row">

            {jobs.map((job) => (
              <React.Fragment>
                <div class=" card shadow col-4 col-4 col-4 md-6 sm-2 ">
                  <img class="card-img-top" src="./a.jpg"></img>
                  <div class="card-body">
                 <table>
                     <tr className="row small">
                         <td className="col-4">
                    {job.jobname}
                         </td>
                         <th></th>
                         <td className="col-5">
                         {job.date.substring(0, 10)}
                         </td>
                         <td className="col-3">

{job.jobtype}
</td>
                     </tr>
                     <tr className="row small">
                     <td className="col-4">
            {job.salary}

                         </td>
                     </tr>
                 </table>
                 
                    {/* <col>
                    <strong>Dead Line: </strong> {job.date.substring(0, 10)}
                    </col>
                    <col>
                    <strong>Description: </strong>{" "}
                    </col> */}
                 
{/*                  
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        overflowWrap: "none",
                      }}
                    >
                      {job.description}
                    </p> */}
                  </div>
                  <a href="#" class="btn btn-dark">
                    APPLY
                  </a>
                </div>
              </React.Fragment>
            ))}
          </div>
            </div>
        );
    }
}

export default newJobs;
