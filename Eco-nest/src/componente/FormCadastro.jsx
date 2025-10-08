import { BotaoTrocaLogin } from "./BotaoTrocaLogin";
import InputForm from "./InputForm";

export function FormCadastro({ trocaLogin }) {
    return <>
        <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center h-50 border border-1  border-secundary p-5 ">

            <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-50">
                <h1 className="text-center text-success">Realizar Cadastro</h1>
                <img src="..\public\logoSemFundo.png" className="img-thumbnail border-0 w-50 h-50 " alt="Logo" />
            </div>

            <form className="container-fluid w-50 justify-content-center">
                <InputForm placeholder={"Nome"} icon={<i className="bi bi-person"></i>} />
                <InputForm placeholder={"Email"} icon={<i className="bi bi-envelope-at"></i>} />
                <InputForm placeholder={"Senha"} icon={<i className="bi bi-lock"></i>} />
                <InputForm placeholder={"Endereço"} icon={<i className="bi bi-globe-americas"></i>} />
                <InputForm placeholder={"Cpf"} icon={<i className="bi bi-file-earmark-lock-fill"></i>}/>
                <InputForm placeholder={"Telefone"} icon={<i className="bi bi-telephone"></i>}/>
        
                <div className="d-flex gap-2 justify-content-center flex-row gap-3">
                    <button className="btn btn-primary w-100">Cadastrar</button>
                    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Login"} />
                </div>

            </form>
        </div>
    </>
}