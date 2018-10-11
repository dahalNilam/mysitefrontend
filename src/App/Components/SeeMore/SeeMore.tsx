import * as React from "react";
import { Label } from "reactstrap";

interface IProps {
  maxLength: number;
}

interface IState {
  showText: boolean;
}

export default class SeeMore extends React.Component<IProps, IState> {
  public readonly state: IState = {
    showText: false
  };

  public render() {
    const { children, maxLength } = this.props;
    const text = children as string;

    if (text.length > maxLength) {
      const ext = text.split(".")[1];
      let end = maxLength;
      if (ext) {
        end = maxLength - (ext.length + 1);
      }

      return (
        <Label>
          {text.slice(0, end)}
          ...
          {ext}
        </Label>
      );
    }
    return <Label>{text}</Label>;
  }
}
