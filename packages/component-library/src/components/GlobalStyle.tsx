import styled from 'styled-components'

export const mediaQuery = {
    medium: '(min-width: 480px)',
}

export default styled.div`
    --color-text: #223a48;
    --color-link: #559cd0;

    font-family: 'Lato', sans-serif;
    color: var(--color-text);
    line-height: 1.42;
    font-weight: 300;
    font-size: 100%;
    box-sizing: border-box;

    @media ${mediaQuery.medium} {
        font-size: 112.5%;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    img {
        max-width: 100%;
        border-style: none;
    }

    a {
        color: var(--color-link);
    }

    code {
        font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono', 'Liberation Mono', Menlo, Courier,
            monospace;
        font-size: 0.85em;
        border-radius: 3px;
    }

    code:not([class*='language-']) {
        background-color: rgba(0, 0, 0, 0.03);
        padding: 0.2em 0.4em;
        color: #78909c;
    }

    small {
        font-size: 80%;
    }

    blockquote {
        padding: 0.6rem 1rem;
        margin: 0 0 1.45rem;
        font-size: 1em;
        border-left: 5px solid #eee;
    }

    ul {
        li {
            margin-bottom: calc(1.45rem / 2);
        }
    }

    blockquote,
    li,
    p {
        & *:last-child {
            margin-bottom: 0;
        }
    }

    table,
    p,
    hr {
        margin: 0 0 1.45rem 0;
        padding: 0;
    }

    hr {
        background: hsla(0, 0%, 0%, 0.2);
        border: none;
        height: 1px;
    }

    table {
        font-size: 1rem;
        line-height: 1.45rem;
        border-collapse: collapse;
        width: 100%;

        thead {
            text-align: left;
        }

        td,
        th {
            text-align: left;
            border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
            font-feature-settings: 'tnum';
            -moz-font-feature-settings: 'tnum';
            -ms-font-feature-settings: 'tnum';
            -webkit-font-feature-settings: 'tnum';
            padding-left: 0.96667rem;
            padding-right: 0.96667rem;
            padding-top: 0.725rem;
            padding-bottom: calc(0.725rem - 1px);

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
            }
        }
    }

    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }

    h2 {
        font-size: 1.5em;
        margin: 0.83em 0;
        margin: 1.7em 0 0.83em;
    }

    h3 {
        font-size: 1.17em;
        margin: 1em 0;
    }

    h4 {
        font-size: 1em;
        margin: 1.33em 0;
    }

    h5 {
        font-size: 0.83em;
        margin: 1.67em 0;
    }

    h6 {
        font-size: 0.67em;
        margin: 2.33em 0;
    }
`
