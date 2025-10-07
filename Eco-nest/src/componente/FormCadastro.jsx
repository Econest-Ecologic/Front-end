import { BotaoTrocaLogin } from "./BotaoTrocaLogin";

export function FormCadastro({ trocaLogin }) {
    return <>
    <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center h-50 border border-1  border-secundary p-5 ">

        <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-50">
            <h1 className="text-center text-success">Realizar Cadastro</h1>
            <img src="..\public\logoSemFundo.png" className="img-thumbnail border-0 w-50 h-50 " alt="Logo" />
        </div>

        <form className="container-fluid w-50 justify-content-center">
            <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input type="text" placeholder="Nome" className="form-control input-success" id="nome" />
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-envelope-at"></i>
                </span>
                <input type="email" placeholder="Email" className="form-control input-success" id="email" />
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text "> <i className="bi bi-lock"></i></span>
                <input type="password" placeholder="Senha" className="form-control input-success" id="senha" />
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-globe-americas"></i>
                </span>
                <input type="text" placeholder="Endereço" className="form-control input-success" id="endereco" />
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-file-earmark-lock-fill"></i></span>
                <input type="text" placeholder="Cpf" className="form-control input-success" id="cpf" />
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-telephone"></i>
                </span>
                <input type="text" placeholder="Telefone" className="form-control input-success" id="relefone" />
            </div>
            <div className="d-flex gap-2 justify-content-center flex-row gap-3">
                <button className="btn btn-primary w-100">Cadastrar</button>
                <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Login"} />
            </div>
        </form>
    </div>
    </>
}