import styled from 'styled-components';

export const Background = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 100vh;
    width: 100vw;
    align-items: center;
    background-image: url('/images/city-blurred-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 300px;
    padding: 15px;
    margin-right: 15vw;
    background-color: var(--gray-dark);
    border-radius: 10px;
    :focus {
        z-index: 2;
        outline: none;
        box-shadow: 0 0 5px 2px var(--green);
        border: 1px solid var(--green);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 180px;

    input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    input {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
        background-color: var(--gray);
        color: white;
        border-color: var(--gray-dark);
    }
    input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    input:focus {
        z-index: 2;
        outline: none;
        box-shadow: 0 0 5px 2px var(--green);
        border: 1px solid var(--green);
        background-color: var(--gray);
        color: white;
    }
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    h1 {
        font-size: 60px;
        font-weight: bolder;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
        color: var(--white);
    }
`;