import { Navbar } from "./componente/Navbar"
import './App.css'
 function App() {

    return (
        <>
            <Navbar />
            <main className="container-fluid d-flex justify-content-center align-items-center" id="container-home">

                <div className="container-sm flex-wrap w-75">
                    <h3>Bem-vindo à Eco Nest 🌱</h3>
                    <p>O lugar certo para quem busca um estilo de vida mais consciente e sustentável.
                        Aqui você encontra produtos ecológicos que fazem a diferença no dia a dia e ajudam a construir um futuro mais verde.
                    </p>
                    <p>
                        🌍 Cada escolha importa.
                    </p>
                    <br />
                    <p>
                        💚 Pequenas mudanças geram grandes impactos.
                    </p>
                    <br />
                    <p>🛒 Conheça nossos produtos e faça parte desse movimento!
                    </p>
                </div>
                <div className="contaner-sm w-25">

                    <div className="row">
                        <div className="col">teste</div>
                        <div className="col">teste</div>
                    </div>
                    <div className="row">
                        <div className="col">teste</div>
                        <div className="col">teste</div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default App;