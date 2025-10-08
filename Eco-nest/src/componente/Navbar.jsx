import { useState } from "react"

export function Navbar() {

  const [tema, setTema] = useState("dark");

    function toggleTheme() {
        const newTheme = tema === "light" ? "dark" : "light";
        setTema(newTheme);
        document.documentElement.setAttribute("data-bs-theme", newTheme);
    }


    return <>
 <nav className="navbar navbar-expand-lg bg-success-subtle">
  <div className="container-fluid">

    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Sobre Nós</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contato</a>
        </li>
        <li classNameName="na-item">
            <button className={tema == 'dark' ? "btn btn-outline-warning border border-0":"btn btn-outline-dark border border-0"} onClick={toggleTheme}>{tema == 'dark' ? <i className="bi bi-brightness-high-fill"></i> : <i class="bi bi-moon"></i>}</button>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        
    </>
}

