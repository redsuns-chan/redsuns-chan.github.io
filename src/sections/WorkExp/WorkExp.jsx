
import JobItem from '../../components/JobList/JobItem/JobItem'
import JobList from '../../components/JobList/JobList'
import EduList from '../EduList/EduList'
import EduItem from '../EduList/EduItem/EduItem'
import './WorkExp.css'

export default function WorkExp({fullpageApi}) {    
    return (
        <div className='work-exp'>
            <h1>Work <div className='title-keyword'>Experiences</div></h1>

            <JobList>
                <JobItem 
                    company='Swire Properties Limited'
                    title='Analyst Programmer'
                    start='Jun-2022'
                    end='presents'/>
                <JobItem 
                    company='Hutchison Telecommunications Hong Kong Holdings Limited'
                    title='Java Developer'
                    start='Mar-2021'
                    end='Jun-2022'/>
                <JobItem 
                    company='PCCW Solutions Limited'
                    title='Solution Developer'
                    start='Jan-2020'
                    end='Mar-2021'/>
            </JobList>

            <EduList>
                <EduItem></EduItem>
                <EduItem></EduItem>
            </EduList>
        </div>
    )
}
