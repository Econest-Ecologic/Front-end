    import { useState } from "react";
    import { FormCadastro } from "../componente/bodyPages/FormCadastro"
    import { FormLogin } from "../componente/bodyPages/FormLogin"

    export function TelaForms() {

        const [isLogin, setIsLogin] = useState(1)

        const trocaLogin=()=>{
            
            if(isLogin == 1){
                setIsLogin(2)
            }else{
                setIsLogin(1)
            }
            console.log(isLogin)
        }

        const renderPage = ()=>{

            switch (isLogin) {
            case 1:
                return <FormCadastro trocaLogin={trocaLogin} />;
            case 2:
                return <FormLogin trocaLogin={trocaLogin}/>;
            }
        }


        return<>
            <main className="container-fluid w-100 min-vh-100 d-flex align-items-center justify-content-center">
            {renderPage()}
            </main>
            
        </>
    }