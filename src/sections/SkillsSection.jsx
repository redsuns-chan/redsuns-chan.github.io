import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartSimple,
	faCode,
	faDatabase,
	faLaptopCode,
	faGear,
	faGlobe,
	faLayerGroup,
	faServer,
	faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faAngular, faAws, faGitAlt, faGithub, faJava, faJs, faNodeJs, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import skills from '../data/skills.json';
import './SkillsSection.css';

const skillMeta = {
	Java: { icon: faJava, area: 'backend', years: 6 },
	TypeScript: { icon: faCode, area: 'frontend', years: 4 },
	JavaScript: { icon: faJs, area: 'frontend', years: 5 },
	Python: { icon: faPython, area: 'backend', years: 3 },
	SQL: { icon: faDatabase, area: 'backend', years: 6 },
	'C#': { icon: faCode, area: 'backend', years: 1 },
	'C++': { icon: faCode, area: 'backend', years: 1 },
	HTML5: { icon: faGlobe, area: 'frontend', years: 5 },
	CSS: { icon: faGlobe, area: 'frontend', years: 5 },
	'Spring Boot': { icon: faLayerGroup, area: 'backend', years: 5 },
	Angular: { icon: faAngular, area: 'frontend', years: 4 },
	'Express.js': { icon: faNodeJs, area: 'backend', years: 2 },
	'Node.js': { icon: faNodeJs, area: 'backend', years: 3 },
	React: { icon: faReact, area: 'frontend', years: 2 },
	MongoDB: { icon: faDatabase, area: 'backend', years: 2 },
	MariaDB: { icon: faDatabase, area: 'backend', years: 5 },
	'Oracle DB': { icon: faDatabase, area: 'backend', years: 4 },
	Git: { icon: faGitAlt, area: 'tool', years: 6 },
	GitHub: { icon: faGithub, area: 'tool', years: 5 },
	'AWS EC2': { icon: faAws, area: 'tool', years: 3 }
};

function SkillsSection() {
	const [showInsights, setShowInsights] = useState(false);

	const insights = useMemo(() => {
		const allSkills = skills.flatMap((group) => group.items);
		const frontendCount = allSkills.filter((name) => skillMeta[name]?.area === 'frontend').length;
		const backendCount = allSkills.filter((name) => skillMeta[name]?.area === 'backend').length;
		const avgYears =
			allSkills.filter((name) => skillMeta[name]?.years).reduce((sum, name) => sum + skillMeta[name].years, 0) /
			Math.max(allSkills.filter((name) => skillMeta[name]?.years).length, 1);
		const yearsList = allSkills
			.filter((name) => skillMeta[name]?.years)
			.map((name) => ({ name, years: skillMeta[name].years }))
			.sort((a, b) => b.years - a.years)
			.slice(0, 8);

		return { frontendCount, backendCount, yearsList, avgYears };
	}, []);

	return (
		<div className='skills-wrap'>
			<div className='skills-heading-row'>
				<h2 className='section-heading'>Skills</h2>
				<button type='button' className='skills-insight-btn' onClick={() => setShowInsights(true)}>
					<FontAwesomeIcon icon={faChartSimple} /> Skill Insights
				</button>
			</div>

			<div className='skills-grid'>
				{skills.map((group) => (
					<div key={group.category} className='glass-card skills-group'>
						<h3>{group.category}</h3>
						<div className='chips'>
							{group.items.map((item) => (
								<span key={item} className='chip'>
									<FontAwesomeIcon icon={skillMeta[item]?.icon || faGear} />
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>

			<div className={`skills-dialog-overlay ${showInsights ? 'open' : ''}`} onClick={() => setShowInsights(false)}>
				<div className='skills-dialog-content glass-card' onClick={(event) => event.stopPropagation()}>
					<button type='button' className='skills-dialog-close' onClick={() => setShowInsights(false)}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<h3>Skill Insights</h3>
					<p className='skills-dialog-subtitle'>Quick overview of capability distribution and experience depth.</p>

					<div className='skills-metric-grid'>
						<div className='skills-metric-card'>
							<span className='metric-icon'>
								<FontAwesomeIcon icon={faLaptopCode} />
							</span>
							<div>
								<p className='skills-dialog-meta'>Frontend</p>
								<strong>{insights.frontendCount}</strong>
							</div>
						</div>
						<div className='skills-metric-card'>
							<span className='metric-icon'>
								<FontAwesomeIcon icon={faServer} />
							</span>
							<div>
								<p className='skills-dialog-meta'>Backend</p>
								<strong>{insights.backendCount}</strong>
							</div>
						</div>
						<div className='skills-metric-card'>
							<span className='metric-icon'>
								<FontAwesomeIcon icon={faChartSimple} />
							</span>
							<div>
								<p className='skills-dialog-meta'>Avg Experience</p>
								<strong>{insights.avgYears.toFixed(1)} yrs</strong>
							</div>
						</div>
					</div>

					<div className='skills-years-list'>
						{insights.yearsList.map((entry) => (
							<div key={entry.name} className='skills-years-item'>
								<span>{entry.name}</span>
								<strong>{entry.years} yrs</strong>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SkillsSection;
