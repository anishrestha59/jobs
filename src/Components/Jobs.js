import React from 'react';
import { Link } from 'react-router-dom';


export default function jobs( {props} ) {
    return (
        <tr>
            <td>{props.jobs.jobname}</td>
            <td>{props.jobs.description}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                <Link to={"/update" + props.jobs._id}> Edit </Link>
                |
                <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> Delete </a>
            </td>
        </tr>

    )
}
