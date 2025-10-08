import InputForm from "./InputOutline";
import { BotaoTrocaLogin } from "./BotaoTrocaLogin";
export function FormLogin({trocaLogin}) {

    const verdeTema = '#2F5E36';

    return <>


        <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center">
            <div className="col-md-4 border border-1  border-secundary p-5 ">

                <h3 className="text-center mb-4" style={{ color: verdeTema }}> Faça o seu Login </h3>

                <div>

                    <InputForm placeholder={"Email"} icon={<i class="bi bi-envelope-at"></i>} />
                    <InputForm placeholder={"Senha"} icon={<i class="bi bi-lock"></i>} />

                    <button className="btn btn-eco w-100">ENTRAR</button>
                    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Cadastro"} />
                </div>
            </div>
        </div>
    </>
}