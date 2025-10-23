import InputOutline from "../componente/InputOutline"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../app.css';

export default function TelaEditarPerfil(){
   const navigate = useNavigate();
    const [nome, setnome] = useState();
    const [email, setemail] = useState();
    const [senha, setsenha] = useState();
    const [endereco, setendereco] = useState();
    const [cnpj, setcnpj] = useState();
    const [telefone, settelefone] = useState();

    return <>

        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-eco d-flex vh-100 ">
            <div className="p-5 custom-card-container bg-body rounded rounded-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start" onClick={() => { navigate(-1) }}> <i className="bi bi-arrow-left-short"></i></button>

                <div className="row">

                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center text-center eco-text" id="logo-container">
                        <h2 className="fw-bold" id="titulo-admin">
                            EDITAR <br /> PERFIL
                        </h2>
                        <img
                            src="..\public\logoSemFundo.png"
                            alt="EcoNest Logo"
                            className="img-fluid w-50"
                        />
                    </div>

                    <div className="col-md-7 d-flex justify-content-center align-items-center">
                        <form className="w-100">

                            <InputOutline type="text" placeholder={"nome"} icon={<i className="bi bi-person"></i>} inputValue={nome} inputFunction={setnome} />


                            <InputOutline type="email" placeholder={"E-mail"} icon={<i className="bi bi-envelope"></i>} inputValue={email} inputFunction={setemail} />


                            <InputOutline type="password" placeholder="Senha" icon={<i className="bi bi-lock"></i>} inputValue={senha} inputFunction={setsenha} />


                            <InputOutline type="text" placeholder="Endereço" icon={<i className="bi bi-geo-alt"></i>} inputValue={endereco} inputFunction={setendereco} />


                            <InputOutline type="text" placeholder="CNPJ" icon={<i className="bi bi-file-text"></i>} inputValue={cnpj} inputFunction={setcnpj} />


                            <InputOutline type="tel" placeholder="Telefone" icon={<i className="bi bi-telephone"></i>} inputValue={telefone} inputFunction={settelefone} />


                            <button
                                type="submit"
                                className="btn w-100 mt-4 btn-lg btn-eco text-white">
                                EDITAR
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}
