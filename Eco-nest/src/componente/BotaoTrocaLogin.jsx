export function BotaoTrocaLogin({trocaLogin,text}){
    return <>
    <button className="btn btn-link w-100" onClick={trocaLogin}> {text} </button>
    </>
}