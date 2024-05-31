export interface ItemPropsInterface {
    islogged: boolean;
}

export interface ItemProps {
    _id: string;
    name: string;
    local: string;
    periodo: string;
    image: string;
    data: string;
    createdAt: string;
    retirada: RetiradaProps;
}

interface RetiradaProps {
    nomeAluno?: string;
    raAluno ?: string;
    dataRetirada ?: string;
    seguranca ?: SecurityProps;
}

interface SecurityProps {
    nome: string;
}