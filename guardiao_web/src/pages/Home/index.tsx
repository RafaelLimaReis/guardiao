import { MagnifyingGlass } from "phosphor-react";
import { ContainerItems, InputSearch } from "./styles";

import produtoTeste from '../../assets/produto_teste.png';
import { ContainerMain } from "../../styles/global";

//TODO criar forma de exibir botão de adicionar novo produto (so segurança)
//TODO as fotos devem ficar sem cor (aluno) e com cor (segurança)
//TODO cadastro o periodo deve ser combobox

const isAdmin = true;

export function Home() {
    return (
        <ContainerMain>
            <h1>itens encontrados</h1>
            <InputSearch>
                <input type="text" name="input_seach" id="input_seach" placeholder="Buscar..."/>
                <button type="button">
                    <MagnifyingGlass size={20} />
                </button>
            </InputSearch>

            <ContainerItems isAdmin={isAdmin}>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula Sala de aula Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
                <div>
                    <img src={produtoTeste} alt="" />
                    <div>
                        <span><b>Data:</b> 22/05/2024</span>
                        <span><b>Local:</b> Sala de aula</span>
                        <span><b>Periodo:</b> noite</span>
                    </div>
                </div>
            </ContainerItems>
        </ContainerMain>
    )
}