export default function Toast({ msg, icon, color = "bg-success" }) {
  return (
    <>
      <div
        className={`toast align-items-center ${color} text-white bottom-0 end-0 position-fixed mb-3 me-3`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="toast"
      >
        <div className="d-flex">
          <div className="toast-body">
            {msg}
            {icon}
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}
