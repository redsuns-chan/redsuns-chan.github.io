import "./Intro.css";

import SkillTag from "../../components/SkillTag/SkillTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import SocialIcon from "../../components/SocialIcon/SocialIcon";

export default function Intro({fullpageApi}) {
    return (
        <div className="intro">
            <div id="name">
                <h1>Hi, I'm <span className="bold">RedSuns</span></h1>
                <h1>A Software Engineer</h1>
                <h2>who experienced in <b>backend</b> and <b>front-end</b> development</h2>
                <div className='skill-tags'>
                    <SkillTag>SpringBoot</SkillTag>
                    <SkillTag>Node.js</SkillTag>
                    <SkillTag>MongoDB</SkillTag>
                    <SkillTag>SQL</SkillTag>
                    <SkillTag>Angular</SkillTag>
                    <SkillTag>React</SkillTag>
                    <SkillTag>HTML5</SkillTag>
                    <SkillTag>CSS</SkillTag>
                </div>
            </div>

            <div className="scroll-button" onClick={ () => fullpageApi.moveSectionDown() }>
                <p>SCROLL DOWN</p>
                <FontAwesomeIcon icon={solid('angle-down')} />
            </div>

            <div className="social-links">
				<SocialIcon className='icon-linkedin' icon={brands('linkedin')} link='https://www.linkedin.com/in/redsuns-chan/'/>
				<SocialIcon className='icon-github' icon={brands('github-square')} link='https://github.com/redsuns-chan'/>
				<SocialIcon className='icon-twitter' icon={brands('twitter-square')} link='https://twitter.com/redsunschan'/>
				<SocialIcon className='icon-medium' icon={brands('medium')} link='https://medium.com/@redsunschan'/>
            </div>
        </div>
    );
}
