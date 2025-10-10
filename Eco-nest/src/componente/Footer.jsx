export default function Footer() {
  return (
    <footer className="container-fluid d-flex flex-row justify-content-evenly bg-success-subtle p-0 py-3 m-0">
      <div className="flex-row">
        <ul>
          <li className="list-unstyled mt-2">
            ✉️ E-mail: contato@econest.com.br
          </li>
          <li className="list-unstyled mt-2">📞 WhatsApp: (49) 3622-8492</li>
          <li className="list-unstyled mt-2">
            📍Endereço: Rua Laguna, 123 – Sua Jaguaruna – SC
          </li>
        </ul>
      </div>
      <div className="d-flex flex-column gap-2">
        <p>© 2025 Eco Nest. Todos os direitos reservados</p>
        <div className="d-flex flex-row">
          <p>
            <i class="bi bi-instagram"></i> Instagram |
          </p>
          <p>
            <i class="bi bi-facebook"></i> Facebook |
          </p>
          <p>
            <i class="bi bi-tiktok"></i>
            TikTok |
          </p>
          <p>
            <i class="bi bi-pinterest"></i> Pinterest
          </p>
        </div>
      </div>
    </footer>
  );
}
