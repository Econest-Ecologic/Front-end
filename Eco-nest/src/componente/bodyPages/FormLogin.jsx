import InputOutline from "../InputOutline";
import { BotaoTrocaLogin } from "../BotaoTrocaLogin";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function FormLogin({trocaLogin}) {

    const verdeTema = '#2F5E36';

    const navigate = useNavigate();
    const [senha,setSenha] = useState();
    const [email,setEmail] = useState();

    function showCadastro(){
        console.log(email,senha)
    }

    function adm(){
        if(email == "adm" && senha == "adm"){
            navigate("/adm")
        }
    }
    return <>
    

        <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center">
            <div className="col-md-4 border border-1  border-secundary p-5 ">

                <h3 className="text-center mb-4" style={{ color: verdeTema }}> Faça o seu Login </h3>

                <div>

                    <InputOutline type={"email"} placeholder={"Email"} icon={<i class="bi bi-envelope-at" ></i>} inputValue={email} inputFunction={setEmail}/>
                    <InputOutline type={"password"} placeholder={"Senha"} icon={<i class="bi bi-lock"></i>} inputValue={senha} inputFunction={setSenha}/>

                    <button className="btn btn-eco w-100" onClick={adm}>ENTRAR</button>
                    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Cadastro"} />
                </div>
            </div>
        </div>
    </>
}