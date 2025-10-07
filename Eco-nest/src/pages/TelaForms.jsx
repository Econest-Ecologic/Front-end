import { FormCadastro } from "../componente/FormCadastro"
import { FormLogin } from "../componente/FormLogin"

export function TelaForms() {

    const [isLogin, setIsLogin] = (true)

    function renderComponent() {
        if (isLogin) {
            return <FormLogin />
        } else {
            return <FormCadastro />

        }
    }

    return <>
        {renderComponent()}
    </>
}