import * as React from "react";
import { Icon } from "react-fa";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

interface IState {
  dropdownOpen: boolean;
}

interface IProps {
  edit: () => void;
  delete: () => void;
}

export default class HousingOptions extends React.Component<IProps, IState> {
  public readonly state = {
    dropdownOpen: false
  };

  private toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle color="info" style={{ borderRadius: 2 }}>
          <Icon name="ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.props.edit}>Edit</DropdownItem>
          <DropdownItem onClick={this.props.delete}>Delete</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
