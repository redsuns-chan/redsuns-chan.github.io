
import './JobItem.css'

export default function JobItem({company, title, start, end}) {
    return <>
        <div className='job-item'>
            <div class='job-item-left'>
                <div className='period'>{start} ~ {end}</div>
            </div>
            <div class='job-item-right'>
                <div className='company'>{company}</div>
                <div className='job-title'>{title}</div>
            </div>
        </div>
    </>
}
