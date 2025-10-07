import { BotaoTrocaLogin } from "./BotaoTrocaLogin"

export function FormLogin({trocaLogin}){
    return <>
    <h1>login</h1>
    <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Cadastro"}/>    
    </>
}