
import './JobItem.css'

export default function JobItem({company, title, start, end}) {
    return <>
        <div className='job-item'>
            <div className='company'>{company}</div>
            <div className='job-title'>{title}</div>
            <div className='period'>{start} ~ {end}</div>
        </div>
    </>
}
