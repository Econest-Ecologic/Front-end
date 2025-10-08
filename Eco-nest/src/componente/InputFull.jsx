export default function InputFull({placeholder,icon}) {
    return <>
        <div className="mb-3 input-group">
            <span className="input-group-text input-success">{icon}</span>
            <input type="text" placeholder={placeholder} className="form-control input-success"  id="nome" />
        </div>
    </>
}