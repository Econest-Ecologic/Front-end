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

            <div className="container-fluid ">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-0 me-5">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Sobre nós</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Contato</a>
                        </li>
                    </ul>
                    <form className="btn-group ms-2" role="search">
                        <input className="form-control rounded-0 rounded-start-3" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
                    </form>
                    <button className="btn btn-outline-success ms-2" onClick={toggleTheme}><i className="bi bi-brightness-high-fill"></i></button>
                </div>

            </div>
        </nav>
    </>
}

