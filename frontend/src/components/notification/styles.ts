/* eslint-disable eqeqeq */
import styled, { keyframes } from 'styled-components';
import { X } from "react-bootstrap-icons";

interface ContainerProps {
    type: "SUCCESS" | "ERROR" | "WARNING";
    exit?: boolean;
}

interface ProgressProps {
    type: "SUCCESS" | "ERROR" | "WARNING";
}

const leaveAnimation = keyframes`
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: 120%;
    }
`;

const appearAnimation = keyframes`
    0% {
        margin-left: 120%;
    }
    100% {
        margin-left: 0;
    }
`;

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 400px;
    height: 50px;
    max-height: 50px;
    border-radius: 8px;
    border: 1px solid var(--${props => props.type == "SUCCESS" ? "green" : props.type == "ERROR" ? "red" : "yellow"});
    color: var(--${props => props.type == "SUCCESS" ? "green" : props.type == "ERROR" ? "red" : "yellow"});
    overflow: hidden;
    animation-name: ${props => props.exit ? leaveAnimation : appearAnimation};
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    margin-bottom: 20px;
    box-shadow: 0 0 10px rgba(0,0,0, 0.3);
    background-color: var(--gray-dark);
`;

export const Progress = styled.div<ProgressProps>`
    background-color: var(--${props => props.type == "SUCCESS" ? "green" : props.type == "ERROR" ? "red" : "yellow"});
    height: 10px;
    max-width: 400px;
`;

export const TextArea = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`;

export const P = styled.p`
    font-size: 14px;
    margin: 0;
    padding-left: 10px;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    width: 25px;
    padding: 1px 2px 0 0;
`;

export const CloseButton = styled(X)`
    cursor: pointer;
`;