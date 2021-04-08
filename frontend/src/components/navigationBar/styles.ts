import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

export const LinkTo = styled(Link) <LinkProps>`
    color: white;
    :focus, :hover, :active, :visited, :link{
        color: white;
        text-decoration: none;
    }
`;