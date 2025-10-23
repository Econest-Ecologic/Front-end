import { useState } from "react"

export default function InputSearch() {

    const [listTotal,setListaTotal] = useState();
    const [filtro,setFiltro] = useState();

    return <>
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
            <ul className="position-absolute d-flex flex-column bg-primary p-0 bg-body rounded-2" id="resultado-pesquisa" style={{ top: "40px", left: "10px", width: "90%" }}>
                <button className="bg-body rounded-2 resp-result py-1">1</button>
                <button className="bg-body rounded-2 resp-result py-1">2</button>
                <button className="bg-body rounded-2 resp-result py-1">3</button>
                <button className="bg-body rounded-2 resp-result py-1">4</button>
             {/* {filtro.map((prod,key)=>{
                 <button className="bg-body rounded-2 resp-result">5</button>
             })} */}
            </ul>
        </form>
    </>
}