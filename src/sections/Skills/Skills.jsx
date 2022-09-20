
import "./Skills.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


export default function Skills() {
    return (
        <div className='region skills'>
			<div className='skills-list'>
				<h1>What I can <span className="keyword">deliver</span>?</h1>
				<div className='skill-panels'>
					<div className='skill-panel'>
						<FontAwesomeIcon className='skill-icon' icon={solid('laptop-code')} />
						<h2>Languages</h2>
						<p>Java, JavaScript, Python, HTML5, CSS3, SQL, PHP, C++</p>
					</div>
					<div className='skill-panel'>
						<FontAwesomeIcon className='skill-icon' icon={solid('cubes')} />
						<h2>Frameworks</h2>
						<p>Spring Boot, Angular, Node.js, React, Express.js</p>
					</div>
					
					<div className='skill-panel'>
						<FontAwesomeIcon className='skill-icon' icon={solid('window-restore')} />
						<h2>Tools</h2>
						<p>VSCode, Git, Jenkins, Jira, Figma, Webflow, Wix, Wordpress</p>
					</div>
				</div>
			</div>
			<div className='region bios'>
				<h1>About Me?</h1>
				<p>
					I'm a software engineer in Hong Kong.
					I have worked in multiple MNC companies to develop large-scale projects with modern web technologies.
					Working in a team with an agile development process to create new features and enhance the existing system is a daily of my job.<br></br>
					<br></br>					
					I keep looking for opportunities to enhance my development and cooperation skills. 
					Please contact me through <a className='hyperlinks' target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/redsuns-chan/'>Linkedin</a> if you want to give me a chance to join your team!
					<br></br>
					<br></br>
				</p>
			</div>
        </div>
    )
}
