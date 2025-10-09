import { useState } from "react"
import { Link } from "react-router-dom";

//Fazer os loguin e os 3 dos usuarios ficarem na tela usuario

export function Navbar({num}) {
  const [tema, setTema] = useState("dark");
  const [numeroCarrinho, setNumeroCarrinho] = useState(0);
  function toggleTheme() {
    const newTheme = tema === "light" ? "dark" : "light";
    setTema(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  }



  return (
    <nav className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container-fluid">

        <a className="navbar-brand" href="#">Navbar</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">

            <li className="nav-item me-3">
              <form className="d-flex input-group" role="search">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-eco input-group-text" type="submit"><i className="bi bi-search"></i></button>
              </form>
            </li>

            <li className="nav-item">

              <Link className={num == 1 ? "nav-link active" : "nav-link"} aria-current="page" to={"/user"}>
                Home
              </Link>

            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sobre Nós</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contato</a>
            </li>
            <li className="nav-item">
              <button className={tema === 'dark' ? "btn btn-outline-warning border-0" : "btn btn-outline-dark border-0"}
                onClick={toggleTheme}>
                {tema === 'dark' ? <i className="bi bi-brightness-high-fill"></i> : <i className="bi bi-moon"></i>}
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-eco bg-transparent border-0 position-relative"><i className="bi bi-cart"></i>
                <span className={tema == 'dark' ? "badge  text-light position-absolute top-0 start-50" : "badge  text-dark position-absolute top-0 start-50"}>{numeroCarrinho}</span>
              </button>
            </li>

            <li className="nav-item">
              <Link to={"/"} className="nav-link btn btn btn-eco">Entrar</Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>

  )
}
