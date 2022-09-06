
import './EduItem.css'

export default function EduItem({institution, qualification, start, end}) {
    return (
        <div className='edu-item'>
            <div className='edu-item-left'>
                <div className='edu-period'>{start}-{end}</div>
            </div>
            <div className='edu-item-right'>
                <div className='edu-inst'>{institution}</div>
                <div className='edu-course'>{qualification}</div>
            </div>
        </div>
    )
}
