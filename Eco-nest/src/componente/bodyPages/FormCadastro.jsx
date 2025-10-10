import { useState } from "react";
import { BotaoTrocaLogin } from "../BotaoTrocaLogin";
import InputOutline from "../InputOutline";

export function FormCadastro({ trocaLogin }) {
    
    const [nome,setNome] = useState();
    const [email,setEmail] = useState();
    const [senha,setSenha] = useState();
    const [cpf,setCpf] = useState();
    const [endereco,setEndereco ] = useState();
    const [telefone,setTelefone] = useState();

    function showConsole(){
        console.log(nome,email,senha,cpf,endereco,telefone)
    }

    return <>


        <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center border border-1  border-secundary p-5 ">

            <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-50">
                <h1 className="text-center text-success">Realizar Cadastro</h1>
                <img src="..\public\logoSemFundo.png" className="img-thumbnail border-0 w-50" alt="Logo" />
            </div>

            <div className="container-fluid w-50 justify-content-center">
                
                <InputOutline  placeholder={"Nome"} icon={<i className="bi bi-person"></i>} inputValue={nome} inputFunction={setNome}/>
                <InputOutline type={"email"} placeholder={"Email"} icon={<i className="bi bi-envelope-at"></i>} inputValue={email} inputFunction={setEmail}/>
                <InputOutline type={"password"} placeholder={"Senha"} icon={<i className="bi bi-lock"></i>} inputValue={senha} inputFunction={setSenha}/>
                <InputOutline placeholder={"Endereço"} icon={<i className="bi bi-globe-americas"></i>} inputValue={endereco} inputFunction={setEndereco}/>
                <InputOutline placeholder={"Cpf"} icon={<i className="bi bi-file-earmark-lock-fill"></i>} inputValue={cpf} inputFunction={setCpf}/>
                <InputOutline placeholder={"Telefone"} icon={<i className="bi bi-telephone"></i>}inputValue={telefone} inputFunction={setTelefone}/>
        
                <div className="d-flex gap-2 justify-content-center flex-column gap-3">
                    <button className="btn btn-eco w-100" onClick={showConsole}>Cadastrar</button>
                    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Login"} />
                </div>

            </div>
        </div>
    </>
}