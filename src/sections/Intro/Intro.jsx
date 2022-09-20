import "./Intro.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import SocialIcon from "../../components/SocialIcon/SocialIcon";

export default function Intro({fullpageApi}) {
    return (
        <div className='intro'>
            <div id='name'>
                <h1>Hi, I'm <span className='bold'>RedSuns</span></h1>
                <h1>A Software Engineer</h1>
                <h2>who experienced in <b>backend</b> and <b>front-end</b> development</h2>
                <a href='#skills'>
                    <button className='hero-button'><FontAwesomeIcon icon={solid('magnifying-glass')} />Know More</button>
                </a>
                
                <a href='https://drive.google.com/file/d/1WYcn1ZpTndt2ADBVpTCjTXNb5_h1SFC_/view?usp=sharing' target='_blank' rel='noreferrer'>
                    <button className='hero-button white'><FontAwesomeIcon icon={solid('cloud-arrow-down')} />My Resume</button>
                </a>
            </div>

            <div className='social-links'>
				<SocialIcon className='icon-linkedin' icon={brands('linkedin')} link='https://www.linkedin.com/in/redsuns-chan/'/>
				<SocialIcon className='icon-github' icon={brands('github-square')} link='https://github.com/redsuns-chan'/>
				<SocialIcon className='icon-twitter' icon={brands('twitter-square')} link='https://twitter.com/redsunschan'/>
				<SocialIcon className='icon-medium' icon={brands('medium')} link='https://medium.com/@redsunschan'/>
            </div>
        </div>
    );
}
