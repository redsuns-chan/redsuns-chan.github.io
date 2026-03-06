import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBriefcase, faGraduationCap, faXmark } from '@fortawesome/free-solid-svg-icons';
import jobs from '../data/jobs.json';
import education from '../data/edu.json';
import './ExperienceSection.css';

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

function ExperienceSection() {
	const [selected, setSelected] = useState(null);
	const [activeKey, setActiveKey] = useState('');
	const [isDialogClosing, setIsDialogClosing] = useState(false);

	const timelineItems = useMemo(() => {
		const jobItems = jobs.map((item) => ({
			...item,
			kind: 'job',
			icon: faBriefcase,
			details: item.details || []
		}));

		const eduItems = education.map((item) => ({
			...item,
			title: item.degree,
			company: item.school,
			type: 'Education',
			description: 'Academic background and computing foundation.',
			kind: 'edu',
			icon: faGraduationCap,
			details: [
				`${item.degree} at ${item.school}`,
				`Period: ${item.start} — ${item.end}`
			]
		}));

		return [...jobItems, ...eduItems].sort((first, second) => monthYearToTimestamp(second.start) - monthYearToTimestamp(first.start));
	}, []);

	const handleSelect = (entry, key) => {
		setActiveKey(key);
		setIsDialogClosing(false);
		setSelected(entry);
	};

	const closeDialog = () => {
		if (!selected || isDialogClosing) {
			return;
		}

		setIsDialogClosing(true);
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		window.setTimeout(() => {
			setSelected(null);
			setActiveKey('');
			setIsDialogClosing(false);
		}, 210);
	};

	return (
		<div className='experience-wrap'>
			<h2 className='section-heading'>Experience & Education</h2>
			<div className='timeline'>
				{timelineItems.map((item, index) => {
					const key = `${item.company}-${item.start}-${index}`;
					const side = index % 2 === 0 ? 'left' : 'right';
					const isActive = key === activeKey;
					const strength = Math.max(0.5, 1 - index * 0.08);
					const total = timelineItems.length;

					return (
						<button
							key={key}
							type='button'
							className={`timeline-item ${side} ${isActive ? 'active' : ''} ${item.kind} ${index === 0 ? 'newest' : ''}`}
							onClick={() => handleSelect(item, key)}
							style={{
								animationDelay: `${index * 120}ms`,
								'--item-strength': strength,
								'--item-progress': total > 1 ? `${index / (total - 1)}` : '0'
							}}
						>
							<div className='timeline-dot'>
								<FontAwesomeIcon icon={item.icon} />
							</div>
							<div className='timeline-card glass-card'>
								<p className='timeline-date'>
									{item.start} — {item.end}
								</p>
								<h3>{item.title}</h3>
								<p className='timeline-company'>{item.company}</p>
								<p className='timeline-summary'>{item.description}</p>
								<span className='timeline-hint' aria-label='View details'>
									<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
								</span>
							</div>
						</button>
					);
				})}
			</div>

			{createPortal(
				<div className={`dialog-overlay ${selected ? 'open' : ''} ${isDialogClosing ? 'closing' : ''}`} onClick={closeDialog}>
					{selected && (
						<div className={`dialog-content ${isDialogClosing ? 'closing' : ''}`} onClick={(event) => event.stopPropagation()}>
							<button type='button' className='dialog-close' onClick={closeDialog}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
							<h3>{selected.title}</h3>
							<p className='timeline-company'>{selected.company}</p>
							<p className='timeline-date'>
								{selected.start} — {selected.end} · {selected.type}
							</p>
							<ul className='dialog-list'>
								{selected.details.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
				</div>,
				document.body
			)}
		</div>
	);
}

export default ExperienceSection;
