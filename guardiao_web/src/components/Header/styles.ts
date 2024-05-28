import styled from "styled-components";
import { mixins } from "../../styles/mixins";

export const HeaderContainer = styled.header`
    img {
        width: 100px;
        height: auto;
        margin: 0 auto;
        display: block;
    }

    a {
        ${mixins.fonts.link}
        font-size: 14px;
        background-color: ${props => props.theme["base-background"]};
        padding: 5px 10px;
        border-radius: 5px;

        text-decoration: none;
    }
`