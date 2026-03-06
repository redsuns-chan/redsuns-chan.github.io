import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import siteConfig from './config/siteConfig';
import './App.css';

function App() {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);

		const image = theme === 'light' ? siteConfig.appearance.backgroundImageLight : siteConfig.appearance.backgroundImageDark;
		const opacity =
			theme === 'light' ? siteConfig.appearance.backgroundOpacityLight : siteConfig.appearance.backgroundOpacityDark;

		document.documentElement.style.setProperty('--site-bg-image', `url(${image})`);
		document.documentElement.style.setProperty('--site-bg-opacity', `${opacity}`);
	}, [theme]);

	return (
		<div className='app-shell'>
			<button
				type='button'
				className='theme-toggle'
				onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
				aria-label='Toggle theme'
			>
				<FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
			</button>

			<main className='page-scroll'>
				<section id='hero' className='section hero-section'>
					<HeroSection onExplore={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} />
				</section>
				<section id='experience' className='section experience-section'>
					<ExperienceSection />
				</section>
				<section id='skills' className='section skills-section'>
					<SkillsSection />
				</section>
			</main>
		</div>
	);
}

export default App;
