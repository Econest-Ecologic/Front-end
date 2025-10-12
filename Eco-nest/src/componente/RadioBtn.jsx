export default function RadioBtn({ name, id, txt, checked }) {
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        id={id}
        name={name}
        checked={checked}
      />
      <label className="btn" htmlFor={id}>
        {txt}
      </label>
    </>
  );
}
