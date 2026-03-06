import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './HeroSection.css';

function HeroSection({ onExplore }) {
	return (
		<div className='hero-container'>
			<div className='hero-card glass-card'>
				<img
					className='hero-avatar'
					src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80'
					alt='RedSuns Chan software engineer portfolio profile photo'
					width='132'
					height='132'
					decoding='async'
					fetchpriority='high'
				/>
				<h1 className='hero-name'>CHAN SZE HO, REDSUNS</h1>
				<p className='hero-role'>Software Engineer · AWS Certified Solutions Architect</p>

				<div className='hero-links'>
					<a href='mailto:redsunschan@gmail.com' aria-label='Email RedSuns Chan software engineer'>
						<FontAwesomeIcon icon={faEnvelope} /> redsunschan@gmail.com
					</a>
					<a href='https://github.com/redsuns-chan' target='_blank' rel='noopener noreferrer' aria-label='Visit RedSuns Chan GitHub software engineering projects'>
						<FontAwesomeIcon icon={faGithub} /> redsuns-chan
					</a>
					<a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' aria-label='Visit RedSuns Chan LinkedIn profile'>
						<FontAwesomeIcon icon={faLinkedin} /> LinkedIn
					</a>
				</div>

				<button type='button' className='hero-cta' onClick={onExplore}>
					View Experience
				</button>
			</div>
		</div>
	);
}

export default HeroSection;
