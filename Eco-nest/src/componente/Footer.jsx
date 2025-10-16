export default function Footer() {
  return (
    <footer className="container-fluid d-flex flex-column flex-sm-row justify-content-evenly bg-navbar p-0 py-3 m-0 mt-3 border-top eco-border">
      <div className="flex-row">
        <ul>
          <li className="list-unstyled mt-2">
            <i className="bi bi-envelope"></i> E-mail: contato@econest.com.br
          </li>
          <li className="list-unstyled mt-2"><i className="bi bi-telephone"></i> WhatsApp: (49) 3622-8492</li>
          <li className="list-unstyled mt-2">
            <i className="bi bi-pin-map-fill"></i>Endereço: Rua Laguna, 123 – Sua Jaguaruna – SC
          </li>
        </ul>
      </div>
      <div className="d-flex flex-column  gap-2">
        <p>© 2025 Eco Nest. Todos os direitos reservados</p>
        <div className="d-flex flex-row">
          <p>
            <i className="bi bi-instagram mx-2"></i> Instagram |
          </p>
          <p>
            <i className="bi bi-facebook mx-2"></i> Facebook |
          </p>
          <p>
            <i className="bi bi-tiktok mx-2"></i>
            TikTok |
          </p>
          <p>
            <i className="bi bi-pinterest mx-2"></i> Pinterest
          </p>
        </div>
      </div>
    </footer>
  );
}
