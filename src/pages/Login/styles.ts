import styled from "styled-components";
import { mixins } from "../../styles/mixins";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    p {
        ${mixins.fonts.titleL}

        color: ${props => props.theme["base-title"]};
        text-align: center;
    }
`

export const ContainerForm = styled.form`
    display: flex;
    flex-direction: column;

    margin-top: 30px;

    label {
        ${mixins.fonts.textM}
        display: block;
        color: ${props => props.theme["base-title"]};
    }
`

export const Input = styled.input`
    background-color: ${props => props.theme["base-input"]};
    border: none;
    margin: 5px 0 10px 0;
    border-radius: 5px;
    padding: 10px;
    height: 50px;
`

export const InputPassword = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme["base-input"]};
    border-radius: 5px;
    padding: 10px;
    height: 50px;

    input {
        background-color: transparent;
        border: none;
        flex-grow: 1;
    }

    button {
        background-color: transparent;
        border: none;
        height: 30px;
        cursor: pointer;
    }
`

export const ButtonLogin = styled.button`
    border-radius: 5px;
    margin: 50px auto 0 auto;
    background-color: ${props => props.theme["base-button"]};

    width: 200px;
    padding: 13px;
    border: 1px solid ${props => props.theme["base-hover"]};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme["base-hover"]};
    }
`