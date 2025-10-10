export default function InputFull({placeholder,icon}) {
    return <>
        <div className="mb-3 input-group">
            <span className="input-group-text input-success eco-border  ">{icon}</span>
                <input type="text" placeholder={placeholder} className="form-control input-success eco-border "  id="nome" />
        </div>
    </>
}