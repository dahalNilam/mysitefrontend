import * as React from "react";
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
} from "reactstrap";

interface IProps {
  onAddHousing: (event: React.MouseEvent<any>) => void;
}

interface IState {
  isOpen: boolean;
}

export default class Menubar extends React.Component<IProps, IState> {
  public readonly state = {
    isOpen: false
  };

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  public render() {
    const { isOpen } = this.state;
    const { onAddHousing } = this.props;

    return (
      <Navbar color="dark" light expand="md" fixed="top">
        <NavbarBrand href="/">MySite</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu right color="dark">
                <DropdownItem onClick={onAddHousing}>
                  Add New Housing
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Login</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
