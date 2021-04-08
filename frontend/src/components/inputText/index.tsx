import { FC, useState } from 'react';
import { Label } from 'reactstrap';
import { InputType } from 'reactstrap/es/Input';
import { Container, RequiredMark, ValidationError, StyledInput } from './styles';

interface Props {
    children?: React.ReactNode;
    required?: boolean;
    type?: InputType;
    key: string;
    valueHandler: [
        value: string,
        updateValue: Function
    ];
    style?: React.CSSProperties;
    placeholder?: string;
}

const InputText: FC<Props> = ({
    children,
    required,
    type,
    key,
    valueHandler,
    style,
    placeholder
}) => {
    const [isOnError, setIsOnError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleRequired = () => {
        if (!required) return;
        // eslint-disable-next-line eqeqeq
        if (valueHandler[0].trim() == "") {
            setError("Este é um campo obrigatório e está vazio!");
            setIsOnError(true);
        }
    }

    return (
        <Container isOnError={isOnError} lines={Math.ceil(error.length / 45)}>
            {
                children
                &&
                <Label key={`label-${key}`} htmlFor={key} className="m-0">{children} {required && <RequiredMark>*</RequiredMark>}</Label>
            }
            <StyledInput
                key={key}
                type={type}
                required={required}
                value={valueHandler[0]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setIsOnError(false);
                    setError("");
                    valueHandler[1](e.target.value);
                }}
                onBlur={handleRequired}
                placeholder={placeholder}
            />
            { isOnError && <ValidationError>* {error}</ValidationError>}
        </Container>
    );
}

export default InputText;