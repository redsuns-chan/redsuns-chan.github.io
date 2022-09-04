import "./Intro.css";

import SkillTag from "../../components/SkillTag/SkillTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default function Intro({fullpageApi}) {
    return (
        <div className="intro">
            <div id="name">
                <h1>Hi, I'm <span className="bold">RedSuns</span></h1>
                <h1>A Software Engineer</h1>
                <h2>who experienced in <b>backend</b> and <b>front-end</b> development</h2>
                <div className="skill-tags-row">
                    <SkillTag>SpringBoot</SkillTag>
                    <SkillTag>Node.js</SkillTag>
                    <SkillTag>MongoDB</SkillTag>
                    <SkillTag>SQL</SkillTag>
                </div>
                <div className="skill-tags-row">
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
                <a className='linkedin' target='_blank' rel='noreferrer noopener' href="https://www.linkedin.com/in/redsuns-chan/"><FontAwesomeIcon icon={brands('linkedin')} /></a>
                <a className='github' target='_blank' rel='noreferrer noopener' href="https://github.com/redsuns-chan"><FontAwesomeIcon icon={brands('github-square')} /></a>
                <a className='twitter' target='_blank' rel='noreferrer noopener' href="https://twitter.com/redsunschan"><FontAwesomeIcon icon={brands('twitter-square')} /></a>
                <a className='medium' target='_blank' rel='noreferrer noopener' href="https://medium.com/@redsunschan"><FontAwesomeIcon icon={brands('medium')} /></a>
            </div>
        </div>
    );
}
