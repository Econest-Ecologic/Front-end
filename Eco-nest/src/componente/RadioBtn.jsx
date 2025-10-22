export default function RadioBtn({ name, id, txt, defaultChecked }) {
  
  // const mostrarToast = () => {
  //   const toast = document.getElementById("toast");
  //   const bsToast = new bootstrap.Toast(toast);
  //   bsToast.show();
  // };
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
