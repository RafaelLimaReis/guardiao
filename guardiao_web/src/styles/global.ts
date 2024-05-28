import styled, { createGlobalStyle } from 'styled-components'
import { mixins } from './mixins'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
    }

    body {
        background-color: ${(props) => props.theme['base-background']};
        color: ${(props) => props.theme['base-text']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        ${mixins.fonts.textM}
    }
`

export const Container = styled.div`
    ${mixins.limitContainer}
    background-color: ${(props) => props.theme.white};
    padding: 10px;
    min-height: 100vh;
    border-radius: 10px;
`

export const Main = styled.main`
    margin-bottom: 80px;
`

export const ContainerMain = styled.div`
    margin-top: 30px;
    text-align: center;
    position: relative;

    h1 {
        ${mixins.fonts.titleM}
    }
`