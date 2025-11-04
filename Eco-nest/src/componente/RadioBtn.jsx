export default function RadioBtn({ name, id, txt, defaultChecked }) {
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
      />
      <label className="btn" htmlFor={id}>
        {txt}
      </label>
    </>
  );
}
