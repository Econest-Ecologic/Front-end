export default function PerfilImg({ img, nome }) {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column gap-2 mt-4"
        style={{ maxWidth: "340px" }}
      >
        <img
          src={img}
          className="rounded-circle w-100"
          style={{ maxWidth: "170px" }}
          alt="img perfil"
        />
        <h5 className="text-wrap text-center eco-text">{nome}</h5>
      </div>
    </>
  );
}
