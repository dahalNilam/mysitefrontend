import * as React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

interface IState {
    isOpen: boolean,
}

export default class Menubar extends React.Component<{}, IState> {
    public readonly state = {
        isOpen: false,
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/">MySite</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    About
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Contact Us
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Login
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}