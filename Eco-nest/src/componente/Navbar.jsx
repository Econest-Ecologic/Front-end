import { useState } from "react";
import { NavLink } from "react-router-dom";

//Fazer os loguin e os 3 dos usuarios ficarem na tela usuario

export function Navbar() {
  const [tema, setTema] = useState("dark");
  function toggleTheme() {
    const newTheme = tema === "light" ? "dark" : "light";
    setTema(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
            <li className="nav-item me-3">
              <form className="d-flex input-group" role="search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-eco input-group-text" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </li>

            <li className="nav-item">
              <NavLink className={"nav-link"} aria-current="page" to={"/home"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to={"/sobre"}>
                Sobre Nós
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/contato"}>
                Contato
              </NavLink>
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
              <NavLink to={"/"} className="nav-link btn btn btn-eco">
                Entrar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
