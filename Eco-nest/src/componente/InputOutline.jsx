export default function InputOutline({placeholder,icon}) {
    return <>
        <div className="mb-3 input-group">
            <span className="input-group-text eco-border">{icon}</span>
            <input type="text" placeholder={placeholder} className="form-control eco-border"  id="nome" />
        </div>
    </>
}