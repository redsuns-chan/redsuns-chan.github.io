
import JobList from '../../components/JobList/JobList'

import './WorkExp.css'

import jobs from '../../data/jobs.json'

export default function WorkExp({fullpageApi}) {    
    return (
        <div className='work-exp'>
            <h1>Work <div className='title-keyword'>Experiences</div></h1>
            <div id='job-and-edu-list'>
                <JobList src={jobs}/>
            </div>
        </div>
    )
}
