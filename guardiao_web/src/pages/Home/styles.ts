import styled from "styled-components";
import { mixins } from "../../styles/mixins";
import { ItemPropsInterface } from "../../interfaces/Item";

export const InputSearch = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme["base-input"]};
    border-radius: 5px;
    padding: 5px 10px;
    max-width: 340px;
    margin: 8px auto 0 auto;

    input {
        ${mixins.fonts.textS}

        background-color: transparent;
        border: none;
        flex-grow: 1;
    }

    button {
        background-color: transparent;
        border: none;
        height: 20px;
        cursor: pointer;
    }
`

export const ContainerItems = styled.div<ItemPropsInterface>`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, minmax(145px, 1fr));
    filter: ${props => !props.islogged ? 'grayscale(100%)' : 'none'};
    gap: 10px;
    cursor: pointer;

    > div {
        min-height: 200px;
        max-width: 200px;
        border-radius: 6px;
        padding: 10px;
        background-color: ${props => props.theme["base-card"]};
        margin: 0 auto;
        width: 100%;

        img {
            width: 80px;
            height: auto;
            border-radius: 5px;
        }

        > div {
            display: flex;
            flex-direction: column;
        }

        span {
            ${mixins.fonts.textS}

            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            b {
                ${mixins.fonts.textM}
                font-weight: 600;
            }
        }
    }
`