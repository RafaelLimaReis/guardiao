import { MagnifyingGlass } from "phosphor-react";
import { ContainerItems, InputSearch } from "./styles";
import { ItemProps } from '../../interfaces/Item';
import { ContainerMain } from "../../styles/global";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { IPCONFIG } from "../../libs/configIp";

interface HomeProps {
    isLogged: boolean;
    items: ItemProps[];
    setFilter: (value: string) => void;
}

export function Home({ isLogged, items, setFilter }: HomeProps) {
    items = items.filter(item => item.retirada == null);
    console.log(items);
    return (
        <ContainerMain>
            <h1>itens encontrados</h1>
            <InputSearch>
                <input type="text" name="input_seach" id="input_seach" placeholder="Buscar..."  onChange={(e) => setFilter(e.target.value)}/>
                <button type="button">
                    <MagnifyingGlass size={20} />
                </button>
            </InputSearch>

            <ContainerItems islogged={isLogged}>
                {items.map(item => (
                    <Link to={isLogged ? `/item/${item._id}` : '#'} key={item._id}>
                        <img src={`${IPCONFIG}${item.image}`} alt="" />
                        <div>
                            <span><b>Item:</b> {item.name}</span>
                            <span><b>Data:</b> {format(new Date(item.data), "dd/MM/yyyy")}</span>
                            <span><b>Local:</b> {item.local}</span>
                            <span><b>Periodo:</b> {item.periodo}</span>
                        </div>
                    </Link>
                ))}
            </ContainerItems>
        </ContainerMain>
    )
}