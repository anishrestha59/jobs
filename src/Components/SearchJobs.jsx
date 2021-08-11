import React from 'react'
import useQuery from './Query/useQuery'
import MyJobsGrid from './Designedmodeljoblist/MyJobsGrid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlus, faSearch, fas } from "@fortawesome/free-solid-svg-icons";



export default function SearchJobs() {
    const query = useQuery();
    const jobname = query.get('jobname') || "";


    const [jobs, setJobs] = useState([]);
    const [searchByJobname, setSearchByJobname] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [searchByCompanyname, setSearchByCompanyname] = useState('');
    const [jobtypes, setJobTypes] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState('Others  ');
    const [searchByJobShift, setSearchByJobShift] = useState('');




    useEffect(async () => {
        await axios
            .get("http://localhost:5000/jobs/")
            .then((response) => {
                setJobs(response.data);
                setFiltered(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        await axios.get('http://localhost:5000/jobtypes')
            .then((response) => {

                setJobTypes(response.data);

            }).catch(err => console.log(err));


    }, []);




    useEffect(() => {


        setFiltered(jobs.filter((job) => {
            const jobname = job.jobname.toLowerCase();
            const lsearchByJobname = searchByJobname.toLowerCase();

            if (jobname.includes(lsearchByJobname)) {
                return job;
            }

        })


        )
    }, [searchByJobname]);

    useEffect(() => {

        setFiltered(jobs.filter((job) => {
            const companyname = job.companyname.toLowerCase();
            const lsearchByCompanyname = searchByCompanyname.toLowerCase();

            if (companyname.includes(lsearchByCompanyname)) {
                return job;
            }

        })


        )
    }, [searchByCompanyname]);


    useEffect(() => {


        setFiltered(jobs.filter((job) => {
            const jobtype = job.jobtype.toLowerCase();
            const lselectedJobType = selectedJobType.toLowerCase();
            if (jobtype.includes(lselectedJobType)) {
                return job;
            }

        })


        )
    }, [selectedJobType]);
    
    useEffect(() => {


        setFiltered(jobs.filter((job) => {
            const jobshift = job.jobshift.toLowerCase();
            const lsearchByJobShift = searchByJobShift.toLowerCase();
            if (jobshift.includes(lsearchByJobShift)) {
                return job;
            }

        })


        )
    }, [searchByJobShift]);



    const handleSearchButton = () => {

        setFiltered(jobs.filter((job) => {
            const jobname = job.jobname.toLowerCase();
            const lsearchByJobname = searchByJobname.toLowerCase();
            const companyname = job.companyname.toLowerCase();
            const lsearchByCompanyname = searchByCompanyname.toLowerCase();
            const jobtype = job.jobtype.toLowerCase();
            const lselectedJobType = selectedJobType.toLowerCase();
            const jobshift = job.jobshift.toLowerCase();
            const lsearchByJobShift = searchByJobShift.toLowerCase();

            if (jobshift.includes(lsearchByJobShift) && jobname.includes(lsearchByJobname) &&
                companyname.includes(lsearchByCompanyname) &&
                jobtype.includes(lselectedJobType)) {
                return job;
            }
            }    )

        )
}


    return (
        <React.Fragment>

            <div className="row">
                <div className="col-2">
                    <div className="form-outline ">
                    <Form.Label className="font-weight-bold">Job Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchByJobname}
                            required
                            placeholder="Search by jobname"
                            onChange={(e) => setSearchByJobname(e.target.value)}
                        />
                        <br />
                        <br />
                        <Form.Label className="font-weight-bold">Company name</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchByCompanyname}
                            required
                            placeholder="Search by company name"
                            onChange={(e) => setSearchByCompanyname(e.target.value)}
                        />

                        <div className="font-weight-bold">
                        <br/>

                            JobTypes:

                            <select      
                             onClick={(e) => {
                    
                                setSelectedJobType(e.target.value)
                  }} class="form-select" aria-label="Default select example">
                                <option value="Others" selected>Others</option>
                                {
                                    jobtypes.map((jobtype) => {
                                        return (
                                            <React.Fragment>
                                                <option key={jobtype['_id']} value={jobtype['jobtype']}>{jobtype['jobtype']}</option>

                                            </React.Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br/>
                        <br/>
                        <Form.Label className="font-weight-bold">Job Shift</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchByJobShift}
                            required
                            placeholder="Search by Job shift"
                            onChange={(e) => setSearchByJobShift(e.target.value)}
                        />
                        <button onClick={handleSearchButton} type="button" className="btn btn-primary">
                            <i ><FontAwesomeIcon icon={faSearch} /></i>
                        </button>
                    </div>
                </div>


                <div className="col-10">
                   
                    <MyJobsGrid jobs={filtered} />
                </div>
            </div>


        </React.Fragment>
    )
}
