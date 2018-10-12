import * as React from "react";
import { FormGroup, Input } from "reactstrap";

export default class SearchBar extends React.Component {
  public render() {
    return (
      <FormGroup style={{ marginBottom: 0, width: "30%" }}>
        <Input
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="search ..."
        />
      </FormGroup>
    );
  }
}
