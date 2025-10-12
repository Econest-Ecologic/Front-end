export default function Toast({ msg, icon }) {
  return (
    <>
      <div
        class="toast align-items-center bg-success text-white bottom-0 end-0 position-fixed mb-3 me-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="toast"
      >
        <div class="d-flex">
          <div class="toast-body">
            {msg}
            {icon}
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}
