import { TelaAdm } from "./TelaAdm"
import { Navbar } from "../componente/Navbar"
import InputFull from "../componente/InputFull"
import InputOutline from "../componente/InputOutline"
import { useState } from "react"


export function CriarAdministrador() {

    const [nome, setnome] = useState();
    const [email, setemail] = useState();
    const [senha, setsenha] = useState();
    const [endereco, setendereco] = useState();
    const [cnpj, setcnpj] = useState();
    const [telefone, settelefone] = useState();

    return <>
        <Navbar></Navbar>

        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-5 custom-card-container">
                <div className="row">

                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center text-center eco-text">
                        <h2 className="mb-4 fw-bold">
                            CRIAR <br /> ADMINISTRADOR
                        </h2>
                        <img
                            src="..\public\logoSemFundo.png"
                            alt="EcoNest Logo"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-md-7">
                        <form>

                            <InputOutline type="text" placeholder={"nome"} icon={<i className="bi bi-person"></i>} inputValue={nome} inputFunction={setnome} />


                            <InputOutline type="email" placeholder={"E-mail"} icon={<i className="bi bi-envelope"></i>} inputValue={email} inputFunction={setemail} />


                            <InputOutline type="password" placeholder="Senha" icon={<i className="bi bi-lock"></i>} inputValue={senha} inputFunction={setsenha} />


                            <InputOutline type="text" placeholder="Endereço" icon={<i className="bi bi-geo-alt"></i>} inputValue={endereco} inputFunction={setendereco} />


                            <InputOutline type="text" placeholder="CNPJ" icon={<i className="bi bi-file-text"></i>} inputValue={cnpj} inputFunction={setcnpj} />

                            
                                    <InputOutline type="tel"  placeholder="Telefone" icon={<i className="bi bi-telephone"></i>} inputValue={telefone} inputFunction={settelefone} />
                           

                            <button
                                type="submit"
                                className="btn w-100 mt-4 btn-lg btn-eco">
                                CRIAR
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}