import { BotaoTrocaLogin } from "./BotaoTrocaLogin";
import InputFull from "./InputFull";
export function FormCadastro({ trocaLogin }) {
    return <>
        <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center border border-1  border-secundary p-5 ">

            <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-50">
                <h1 className="text-center text-success">Realizar Cadastro</h1>
                <img src="..\public\logoSemFundo.png" className="img-thumbnail border-0 w-50" alt="Logo" />
            </div>

            <form className="container-fluid w-50 justify-content-center">
                <InputFull placeholder={"Nome"} icon={<i className="bi bi-person"></i>} />
                <InputFull placeholder={"Email"} icon={<i className="bi bi-envelope-at"></i>} />
                <InputFull placeholder={"Senha"} icon={<i className="bi bi-lock"></i>} />
                <InputFull placeholder={"Endereço"} icon={<i className="bi bi-globe-americas"></i>} />
                <InputFull placeholder={"Cpf"} icon={<i className="bi bi-file-earmark-lock-fill"></i>}/>
                <InputFull placeholder={"Telefone"} icon={<i className="bi bi-telephone"></i>}/>
        
                <div className="d-flex gap-2 justify-content-center flex-column gap-3">
                    <button className="btn btn-eco w-100">Cadastrar</button>
                    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Login"} />
                </div>

            </form>
        </div>
    </>
}