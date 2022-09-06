
import EduItem from "./EduItem/EduItem"

import './EduList.css'

export default function EduList({children, src=[]}) {

    let childs = [];
    for (let s of src) {
        childs.push(<EduItem key={"edu"+s.start+s.end}
            institution={s.institution}
            qualification={s.qualification}
            start={s.start}
            end={s.end}/>);
    }

    return (
        <div className='edu-list'>
            {childs}
            {children}
        </div>
    )
}
