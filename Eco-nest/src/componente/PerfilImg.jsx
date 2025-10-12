export default function PerfilImg({
  img,
  nome,
  widthImg = "170px",
  heightImg = "auto",
}) {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column gap-2 mt-4"
        style={{}}
      >
        <img
          src={img}
          className="rounded-circle w-100 object-fit-cover"
          style={{ maxWidth: widthImg, maxHeight: heightImg }}
          alt="img perfil"
        />
        <h5 className="text-wrap text-center eco-text">{nome}</h5>
      </div>
    </>
  );
}
