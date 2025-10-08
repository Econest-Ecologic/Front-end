export default function InputForm({placeholder,icon}) {
    return <>
        <div className="mb-3 input-group">
            <span className="input-group-text">{icon}</span>
            <input type="text" placeholder={placeholder} className="form-control input-success" id="nome" />
        </div>
    </>
}