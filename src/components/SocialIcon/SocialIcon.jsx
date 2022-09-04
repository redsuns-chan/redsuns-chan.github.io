
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SocialIcon.css'

export default function SocialIcon({className, link, icon}) {
	return (
		<div className="social-icon">
			<a className={className} target='_blank' rel='noreferrer noopener' href={link}><FontAwesomeIcon icon={icon} /></a>
		</div>
	)
}
