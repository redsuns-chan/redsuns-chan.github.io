import SkillTag from "./SkillTag/SkillTag";

export default function SkillTagList({children, src}) {
    let childs = [];
    for (let s of src) {
        childs.push(<SkillTag>{s}</SkillTag>);
    }

    return <>
        <div className='job-list'>
            {childs}
            {children}
        </div>
    </>
}
