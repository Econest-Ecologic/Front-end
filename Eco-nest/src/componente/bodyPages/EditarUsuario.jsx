import { useEffect } from "react";
import { NavbarLogado } from "../NavbarLogado";
import { useState } from "react";
import InputOutline from "../InputOutline";
import { usuarioService } from "../../services/usuarioService";

export default function EditarUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [estado, setEstado] = useState("SC");
    const [usuario, setUsuario] = useState([]);
    const estadosBrasil = [
        { nome: "Acre", sigla: "AC" },
        { nome: "Alagoas", sigla: "AL" },
        { nome: "Amapá", sigla: "AP" },
        { nome: "Amazonas", sigla: "AM" },
        { nome: "Bahia", sigla: "BA" },
        { nome: "Ceará", sigla: "CE" },
        { nome: "Distrito Federal", sigla: "DF" },
        { nome: "Espírito Santo", sigla: "ES" },
        { nome: "Goiás", sigla: "GO" },
        { nome: "Maranhão", sigla: "MA" },
        { nome: "Mato Grosso", sigla: "MT" },
        { nome: "Mato Grosso do Sul", sigla: "MS" },
        { nome: "Minas Gerais", sigla: "MG" },
        { nome: "Pará", sigla: "PA" },
        { nome: "Paraíba", sigla: "PB" },
        { nome: "Paraná", sigla: "PR" },
        { nome: "Pernambuco", sigla: "PE" },
        { nome: "Piauí", sigla: "PI" },
        { nome: "Rio de Janeiro", sigla: "RJ" },
        { nome: "Rio Grande do Norte", sigla: "RN" },
        { nome: "Rio Grande do Sul", sigla: "RS" },
        { nome: "Rondônia", sigla: "RO" },
        { nome: "Roraima", sigla: "RR" },
        { nome: "Santa Catarina", sigla: "SC" },
        { nome: "São Paulo", sigla: "SP" },
        { nome: "Sergipe", sigla: "SE" },
        { nome: "Tocantins", sigla: "TO" },
    ];

    useEffect(() => {
        const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario'));
        // const usuarioData = [];
        console.log(JSON.parse(localStorage.getItem('usuario')));

        try {
            // usuarioData = usuarioService.buscarPorId(usuarioCadastrado.id);
            console.log("Buscando usuario")
        } catch (e) {
            console.error("Erro : " + e)
        }

        if (usuarioCadastrado) {
            setUsuario(usuarioCadastrado);
        } else {
            alert("usuario não encontrado")
        }

    }, [])

    useEffect(() => {
        console.log(usuario)
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setEndereco(usuario.endereco);
        setCpf(usuario.cpf);
        setTelefone(usuario.telefone);
        setEstado(usuario.estado)
    }, [usuario])


    function atualizarUsuario() {
        alert(usuario);
    }

    return (
        <>
            <NavbarLogado />
            <main className="container-fluid d-flex flex-row flex-wrap justify-content-center align-items-center border border-1 border-secundary p-5">
                <div className="row">

                    <div className="col-md-6 d-flex justify-content-center align-items-center flex-column ">
                        <h1 className="text-center text-success">Editar perfil {nome}</h1>
                        <img
                            src="../public/logoSemFundo.png"
                            className="img-thumbnail border-0 w-50"
                            alt="Logo"
                        />
                    </div>

                    <div className=" col-md-6 justify-content-center">
                        <form>
                            <InputOutline
                                placeholder="Nome"
                                icon={<i className="bi bi-person"></i>}
                                inputValue={nome}
                                inputFunction={setNome}
                            />
                            <InputOutline
                                type="email"
                                placeholder="Email"
                                icon={<i className="bi bi-envelope-at"></i>}
                                inputValue={email}
                                inputFunction={setEmail}
                            />
                            <InputOutline
                                type="password"
                                placeholder="Senha"
                                icon={<i className="bi bi-lock"></i>}
                                inputValue={senha}
                                inputFunction={setSenha}
                            />
                            <InputOutline
                                placeholder="Endereço"
                                icon={<i className="bi bi-globe-americas"></i>}
                                inputValue={endereco}
                                inputFunction={setEndereco}
                            />
                            <InputOutline
                                placeholder="CPF (apenas números)"
                                icon={<i className="bi bi-file-earmark-lock-fill"></i>}
                                inputValue={cpf}
                                inputFunction={setCpf}
                            />
                            <InputOutline
                                placeholder="Telefone (apenas números)"
                                icon={<i className="bi bi-telephone"></i>}
                                inputValue={telefone}
                                inputFunction={setTelefone}
                            />

                            <div className="mb-3">
                                <select
                                    className="form-select eco-border"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    {estadosBrasil.map((est) => (
                                        <option value={est.sigla}>{est.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex gap-2 justify-content-center flex-column gap-3">
                                <button
                                    className="btn btn-eco w-100"
                                    type="submit"
                                    onClick={() => atualizarUsuario()}
                                >
                                    Atualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}