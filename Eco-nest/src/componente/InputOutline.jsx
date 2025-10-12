export default function InputOutline({
  type = "text",
  placeholder,
  icon,
  inputValue = "",
  inputFunction,
}) {
  return (
    <>
      <div className="mb-3 input-group">
        <span className="input-group-text eco-border">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="form-control eco-border"
          value={inputValue}
          onChange={(e) => inputFunction(e.target.value)}
        />
      </div>
    </>
  );
}
