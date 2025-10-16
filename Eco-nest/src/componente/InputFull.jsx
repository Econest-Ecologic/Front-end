export default function InputFull({type, placeholder }) {
    return <>
        <div className="mb-3 input-group">
            <input
                type={type}
                placeholder={placeholder}
                className="form-control eco-border"
                onChange={(e) => inputFunction(e.target.value)}
            />        </div>
    </>
}