import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 50%;
    width: 60%;
    max-width: 500px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    margin:  12px 0 0 12px;
    justify-content: space-between;
    width: 100%;
    max-width: 320px;
`;