import styled from "styled-components";
import { mixins } from "../../styles/mixins";

export const FooterContainer = styled.footer`
    ${mixins.limitContainer}
    
    background-color: ${props => props.theme.white};
    border-top: 1px solid ${props => props.theme["base-hover"]};
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`