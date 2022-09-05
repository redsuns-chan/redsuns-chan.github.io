
import './WorkExp.css'

export default function WorkExp({fullpageApi}) {    
    return (
        <div className='work-exp'>
            <h1>Work <div className='title-keyword'>Experiences</div></h1>
            <div className='jobs'>
                <div className='job'>
                    <div className='company'>Swire Properties Limited</div>
                    <div className='job-title'>Analyst Programmer</div>
                    <div className='period'>Jun-2022 ~ PRESENTS</div>
                </div>
                <div className='job'>
                    <div className='company'>Hutchison Telecom</div>
                    <div className='job-title'>Java Developer</div>
                    <div className='period'>Mar-2021 ~ Jun-2022</div>
                </div>
                <div className='job'>
                    <div className='company'>PCCW Solutions</div>
                    <div className='job-title'>Solution Developer</div>
                    <div className='period'>Jan-2020 ~ Mar-2021</div>
                </div>
            </div>
        </div>
    )
}
