import styled, { keyframes } from 'styled-components';
import { Input, InputProps } from 'reactstrap';

export const Container = styled.div<{ isOnError: boolean, lines: number }>`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 0 0 12px 12px;
    width: 100%;
    max-width: 320px;
    height: ${({ isOnError, lines }) => !isOnError ? "60px" : `${(lines * 15) + 60}px`};
    color: whitesmoke;
`;

const fadeIn = keyframes`
    0% {
        margin-top: 50px;
        opacity: 0;
    }
    50% {
        opacity: 0.2;
    }
    100% {
        margin-top: 60px;
        opacity: 1;
    }
`;

export const ValidationError = styled.p`
    position: fixed;
    margin: 0;
    margin-top: 60px;
    font-size: 12px;
    max-width: 320px;
    color: var(--red);
    font-weight: bold;
    animation-name: ${fadeIn};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;

export const RequiredMark = styled.p`
    margin: 0;
    color: var(--red);
    font-weight: bold;
    display: inline-flex;
`;

export const StyledInput = styled(Input) <InputProps>`
    background-color: var(--gray);
    color: white;
    :focus {
        color: white;
        background-color: var(--gray);
    }
    ::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;