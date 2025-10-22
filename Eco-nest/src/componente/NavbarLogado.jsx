import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NavbarLogado() {
  const navigate = useNavigate();
  //quando a pagina atualiza ele pega no local storag qual o ultimo tema salvo
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") || "dark";
    setTema(temaSalvo);
    document.documentElement.setAttribute("data-bs-theme", temaSalvo);
  }, []);

  const [tema, setTema] = useState("dark");
  function toggleTheme() {
    const newTheme = tema === "light" ? "dark" : "light";
    setTema(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("tema", newTheme);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-navbar border-bottom eco-border py-2">
      <div className="container-fluid">
        <a class="navbar-brand border-0" id="logo">
          <img
            src="\public\LogoMaior.png"
            alt="Bootstrap"
            width="70"
            height="70"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse w-100"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2 w-100 justify-content-end">
            <li className="nav-item me-3 w-25">
              <form className="d-flex input-group position-relative" role="search">
                <input
                  className="form-control border eco-border border-end-0 rounded-start-0 rounded-start-5"
                  type="search"
                  placeholder="Pesquise o produto desejado"
                  aria-label="Search"
                  id="input-navbar"
                />
                <button className="btn btn-navbar border eco-border border-start-0 input-group-text rounded-end-5" type="submit">
                  <i className="bi bi-search"></i>
                </button>
                  <ul className="position-absolute d-flex flex-column bg-primary p-0 bg-body" id="resultado-pesquisa" style={{top:"37px", left:"10px",width:"90%"}}>
                    <button className="bg-body border-1">1</button>
                    <button className="bg-body border-1">2</button>
                    <button className="bg-body border-1">3</button>
                    <button className="bg-body border-1">4</button>
                    <button className="bg-body border-1">5</button>
                  </ul>
              </form>
            </li>


            <li className="nav-item">
              <button
                className={
                  tema === "dark"
                    ? "btn btn-outline-warning border-0"
                    : "btn btn-outline-dark border-0"
                }
                onClick={toggleTheme}
              >
                {tema === "dark" ? (
                  <i className="bi bi-brightness-high-fill"></i>
                ) : (
                  <i className="bi bi-moon"></i>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-eco bg-transparent border-0 position-relative">
                <i className="bi bi-cart"></i>
                <span
                  className={
                    tema == "dark"
                      ? "badge  text-light position-absolute top-0 start-50"
                      : "badge  text-dark position-absolute top-0 start-50"
                  }
                >
                  {0}
                </span>
              </button>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="\elessandro.jpeg"
                    alt="Bootstrap"
                    width="80"
                    height="80"
                    className="rounded-circle btn btn-sm img-fluid " />
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><button onClick={() => navigate("/")} className="btn btn-outline-danger rounded-0 m-0 w-100"><i class="bi bi-box-arrow-in-left"></i></button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
