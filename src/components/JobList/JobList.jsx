
import JobItem from "./JobItem/JobItem";

import './JobList.css'

export default function JobList({children, src=[]}) {

    let childs = [];
    for (let s of src) {
        childs.push(<JobItem key={"job"+s.start+s.end}
            company={s.company}
            title={s.title}
            start={s.start}
            end={s.end}/>);
    }

    return <>
        <div className='job-list'>
            {childs}
            {children}
        </div>
    </>
}
