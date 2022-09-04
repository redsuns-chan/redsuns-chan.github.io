
import './LightButton.css'

export default function LightButton({children}) {
    return (
        <div className="light-button">
            <button>{children}</button>
        </div>
    )
}
