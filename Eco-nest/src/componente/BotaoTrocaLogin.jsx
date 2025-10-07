export function BotaoTrocaLogin({trocaLogin,text}){
    return <>
    <button className="btn btn-success w-100" onClick={trocaLogin}> {text} </button>
    </>
}