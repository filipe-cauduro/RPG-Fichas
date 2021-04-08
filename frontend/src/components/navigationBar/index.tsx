import { FC, useState } from "react";
import { NavLink, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";
import { LinkTo } from "./styles";

const NavigationBar: FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(isOpen => !isOpen);

    return (
        <Navbar expand="md">
            <NavbarBrand>
                <LinkTo to="/home"><h1>TTRPG</h1></LinkTo>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <LinkTo to="/user/characters">Characters</LinkTo>
                    </NavItem>
                    <NavItem>
                        <NavLink>teste</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default NavigationBar;