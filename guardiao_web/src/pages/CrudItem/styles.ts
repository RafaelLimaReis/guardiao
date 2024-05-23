import { Link } from "react-router-dom";
import styled from "styled-components";
import { mixins } from "../../styles/mixins";

export const ContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    div:last-child {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;

        button {
            width: 200px;
            border: none;

            ${mixins.fonts.textM}
            color: ${props => props.theme.white};

            display: block;

            border-radius: 5px;
            background-color: ${props => props.theme["base-label"]};
            padding: 8px;
            cursor: pointer;
        }
    }
`

export const PreloadImage = styled.div`
    background: ${props => props.theme["base-hover"]};
    border: 1px solid ${props => props.theme["base-hover"]};
    width: 200px;
    height: 200px;
    border-radius: 5px;
    margin: 0 auto 20px auto;

    img {
        width: 100%;
        height: 100%;
    }
`

export const Input = styled.input`
    background-color: ${props => props.theme["base-input"]};
    border: none;
    margin: 5px 0 10px 0;
    border-radius: 5px;
    padding: 5px;
    width: 200px;
`

export const LinkButton = styled(Link)`
    ${mixins.fonts.textM}
    text-decoration: none;
    color: ${props => props.theme.black};

    width: 200px;
    display: block;

    border-radius: 5px;
    background-color: ${props => props.theme["base-button"]};
    padding: 8px;
    border: 1px solid ${props => props.theme["base-hover"]};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme["base-hover"]};
    }
`