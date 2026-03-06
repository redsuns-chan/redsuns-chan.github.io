import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faCalendarDays, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import jobs from '../data/jobs.json';
import education from '../data/edu.json';
import './ExperienceSection.css';

const sectionEdgeBuffer = {
	start: 0.16,
	end: 0.18
};

const snapDelayMs = 140;
const autoScrollReleaseMs = 520;

const monthIndexMap = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11
};

function monthYearToTimestamp(value) {
	if (value === 'Present') {
		return Date.now();
	}

	if (!value) {
		return Number.NEGATIVE_INFINITY;
	}

	const [monthText, yearText] = value.split('-');
	const month = monthIndexMap[monthText];
	const year = Number.parseInt(yearText, 10);

	if (month === undefined || Number.isNaN(year)) {
		return Number.NEGATIVE_INFINITY;
	}

	return new Date(year, month, 1).getTime();
}

function formatDuration(start, end) {
	const startTimestamp = monthYearToTimestamp(start);
	const endTimestamp = monthYearToTimestamp(end);

	if (!Number.isFinite(startTimestamp) || !Number.isFinite(endTimestamp) || endTimestamp < startTimestamp) {
		return '';
	}

	const startDate = new Date(startTimestamp);
	const endDate = new Date(endTimestamp);
	const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;

	if (totalMonths <= 0) {
		return '';
	}

	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;
	const yearLabel = years ? `${years} yr${years > 1 ? 's' : ''}` : '';
	const monthLabel = months ? `${months} mo${months > 1 ? 's' : ''}` : '';

	return [yearLabel, monthLabel].filter(Boolean).join(' ');
}

function getBufferedProgress(rawProgress) {
	const usableRange = Math.max(1 - sectionEdgeBuffer.start - sectionEdgeBuffer.end, 0.01);
	return Math.min(1, Math.max(0, (rawProgress - sectionEdgeBuffer.start) / usableRange));
}

function getProgressForIndex(index, totalItems) {
	if (totalItems <= 1) {
		return 0.5;
	}

	const usableRange = 1 - sectionEdgeBuffer.start - sectionEdgeBuffer.end;
	return sectionEdgeBuffer.start + (index / (totalItems - 1)) * usableRange;
}

function ExperienceSection() {
	const sectionRef = useRef(null);
	const snapTimeoutRef = useRef(0);
	const autoScrollTimeoutRef = useRef(0);
	const autoScrollingRef = useRef(false);
	const [scrollState, setScrollState] = useState({
		progress: 0,
		rawProgress: 0,
		floatIndex: 0,
		activeIndex: 0
	});

	const timelineItems = useMemo(() => {
		const jobItems = jobs.map((item) => ({
			...item,
			kind: 'job',
			kindLabel: 'Role',
			accent: 'var(--accent-color)',
			icon: faBriefcase,
			details: item.details || [],
			duration: formatDuration(item.start, item.end)
		}));

		const eduItems = education.map((item) => ({
			...item,
			title: item.degree,
			company: item.school,
			type: 'Education',
			kindLabel: 'Study',
			description: 'Academic background and computing foundation.',
			kind: 'edu',
			accent: '#2ec776',
			icon: faGraduationCap,
			details: [
				`${item.degree} at ${item.school}`,
				`Period: ${item.start} — ${item.end}`
			],
			duration: formatDuration(item.start, item.end)
		}));

		return [...jobItems, ...eduItems].sort((first, second) => monthYearToTimestamp(second.start) - monthYearToTimestamp(first.start));
	}, []);

	useEffect(() => {
		let frameId = 0;

		const clearSnapTimeout = () => {
			if (snapTimeoutRef.current) {
				window.clearTimeout(snapTimeoutRef.current);
				snapTimeoutRef.current = 0;
			}
		};

		const scheduleSnap = (nextActiveIndex, rawProgress) => {
			clearSnapTimeout();

			if (autoScrollingRef.current || rawProgress <= 0 || rawProgress >= 1) {
				return;
			}

			snapTimeoutRef.current = window.setTimeout(() => {
				const section = sectionRef.current;

				if (!section || autoScrollingRef.current) {
					return;
				}

				const viewportHeight = window.innerHeight;
				const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
				const sectionTop = section.getBoundingClientRect().top + window.scrollY;
				const targetProgress = getProgressForIndex(nextActiveIndex, timelineItems.length);
				const targetTop = sectionTop + scrollableDistance * targetProgress;
				const difference = Math.abs(window.scrollY - targetTop);

				if (difference > 12) {
					autoScrollingRef.current = true;
					window.scrollTo({ top: targetTop, behavior: 'smooth' });
					window.clearTimeout(autoScrollTimeoutRef.current);
					autoScrollTimeoutRef.current = window.setTimeout(() => {
						autoScrollingRef.current = false;
					}, autoScrollReleaseMs);
				}
			}, snapDelayMs);
		};

		const updateScrollState = () => {
			frameId = 0;
			const section = sectionRef.current;

			if (!section) {
				return;
			}

			const viewportHeight = window.innerHeight;
			const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
			const { top } = section.getBoundingClientRect();
			const rawProgress = Math.min(1, Math.max(0, -top / scrollableDistance));
			const progress = getBufferedProgress(rawProgress);
			const floatIndex = progress * Math.max(timelineItems.length - 1, 0);
			const activeIndex = Math.min(timelineItems.length - 1, Math.max(0, Math.round(floatIndex)));

			scheduleSnap(activeIndex, rawProgress);

			setScrollState((current) => {
				if (
					Math.abs(current.progress - progress) < 0.001 &&
					Math.abs(current.rawProgress - rawProgress) < 0.001 &&
					Math.abs(current.floatIndex - floatIndex) < 0.001 &&
					current.activeIndex === activeIndex
				) {
					return current;
				}

				return {
					progress,
					rawProgress,
					floatIndex,
					activeIndex
				};
			});
		};

		const queueUpdate = () => {
			if (!frameId) {
				frameId = window.requestAnimationFrame(updateScrollState);
			}
		};

		queueUpdate();
		window.addEventListener('scroll', queueUpdate, { passive: true });
		window.addEventListener('resize', queueUpdate);

		return () => {
			clearSnapTimeout();
			if (autoScrollTimeoutRef.current) {
				window.clearTimeout(autoScrollTimeoutRef.current);
			}
			window.removeEventListener('scroll', queueUpdate);
			window.removeEventListener('resize', queueUpdate);
			if (frameId) {
				window.cancelAnimationFrame(frameId);
			}
		};
	}, [timelineItems.length]);

	const scrollToIndex = useCallback(
		(index) => {
			const section = sectionRef.current;

			if (!section) {
				return;
			}

			const safeIndex = Math.min(timelineItems.length - 1, Math.max(0, index));
			const viewportHeight = window.innerHeight;
			const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
			const targetProgress = getProgressForIndex(safeIndex, timelineItems.length);
			const targetTop = section.getBoundingClientRect().top + window.scrollY + scrollableDistance * targetProgress;

			autoScrollingRef.current = true;
			window.scrollTo({ top: targetTop, behavior: 'smooth' });
			window.clearTimeout(autoScrollTimeoutRef.current);
			autoScrollTimeoutRef.current = window.setTimeout(() => {
				autoScrollingRef.current = false;
			}, autoScrollReleaseMs);
		},
		[timelineItems.length]
	);

	return (
		<div className='experience-wrap' ref={sectionRef} style={{ '--album-steps': timelineItems.length + 0.82 }}>
			<div className='experience-sticky'>
				<div className='experience-sidebar'>
					<div className='experience-heading-group'>
						<span className='experience-kicker'>Resume</span>
						<h2 className='section-heading'>Experience & Education</h2>
						<p className='experience-copy'>
							A concise view of the roles, projects, and studies that shaped my journey as a software engineer.
						</p>
					</div>

					<div className='experience-timeline' aria-label='Experience timeline'>
						<div className='experience-timeline-line' aria-hidden='true' />
						{timelineItems.map((item, index) => {
							const isActive = index === scrollState.activeIndex;

							return (
								<button
									key={`${item.company}-${item.start}-${index}`}
									type='button'
									className={`experience-timeline-node ${isActive ? 'active' : ''}`}
									onClick={() => scrollToIndex(index)}
									style={{ '--timeline-accent': item.accent }}
								>
									<span className='experience-timeline-icon'>
										<FontAwesomeIcon icon={item.icon} />
									</span>
									<div className='experience-timeline-copy-wrap'>
										<strong>{item.title}</strong>
										<small>{item.company}</small>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				<div className='experience-stage'>
					<div className='experience-card-stack'>
						{timelineItems.map((item, index) => {
							const delta = index - scrollState.floatIndex;
							const distance = Math.abs(delta);
							const direction = delta === 0 ? 0 : delta / distance;
							const isActive = index === scrollState.activeIndex;
							const translateY = delta * 16;
							const translateX = direction * Math.min(distance * 26, 56);
							const scale = Math.max(0.8, 1 - distance * 0.08);
							const opacity = Math.max(0, 1 - distance * 0.28);
							const rotate = direction * Math.min(distance * 4.5, 8);
							const blur = Math.max(0, distance - 0.18) * 1.4;
							const depth = Math.round(distance * 220);
							const stackLevel = Math.round(1000 - distance * 120 + (isActive ? 200 : 0));

							return (
								<article
									key={`${item.company}-${item.start}-${index}`}
									className={`album-card glass-card ${item.kind} ${isActive ? 'active' : ''}`}
									style={{
										'--card-shift-y': `${translateY}vh`,
										'--card-shift-x': `${translateX}px`,
										'--card-scale': scale,
										'--card-opacity': opacity,
										'--card-rotate': `${rotate}deg`,
										'--card-blur': `${blur}px`,
										'--card-depth': depth,
										'--card-accent': item.accent,
										zIndex: stackLevel
									}}
								>
									<div className='album-card-main'>
										<div className='album-sequence'>
											<FontAwesomeIcon icon={item.icon} />
											<span>
												{item.kindLabel} {String(index + 1).padStart(2, '0')}
											</span>
										</div>

										<div className='album-pill-row'>
											<span className='album-pill kind'>{item.type}</span>
											{item.duration ? <span className='album-pill'>{item.duration}</span> : null}
										</div>

										<h3>{item.title}</h3>
										<p className='album-company'>
											<FontAwesomeIcon icon={faBuilding} />
											<span>{item.company}</span>
										</p>
										<p className='album-description'>{item.description}</p>
									</div>

									<div className='album-card-side'>
										<div className='album-info-panel'>
											<div className='album-info-item'>
												<span>
													<FontAwesomeIcon icon={faCalendarDays} /> Timeline
												</span>
												<strong>
													{item.start} — {item.end}
												</strong>
											</div>
											<div className='album-info-item'>
												<span>
													<FontAwesomeIcon icon={faLocationDot} /> Context
												</span>
												<strong>{item.type}</strong>
											</div>
										</div>

										<div className='album-highlight-panel'>
											<p className='album-panel-label'>Highlights</p>
											<ul className='album-highlights'>
												{item.details.map((detail) => (
													<li key={detail}>{detail}</li>
												))}
											</ul>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExperienceSection;
