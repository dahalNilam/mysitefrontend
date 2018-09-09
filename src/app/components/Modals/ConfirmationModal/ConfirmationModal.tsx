import * as React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";

interface IProps {
  onConfirm: () => void;
}

interface IState {
  isOpen: boolean;
  title: string;
}

interface ICallbackProps {
  title: string;
}

export default class ConfirmationModal extends React.Component<IProps, IState>
  implements IModal<ICallbackProps> {
  public type = ModalTypes.ConfirmationModal;

  public show = (props: ICallbackProps) => {
    this.setState({
      isOpen: true,
      title: props.title
    });
  };

  public readonly state = {
    isOpen: false,
    title: ""
  };

  private close = () => {
    this.setState({
      isOpen: false
    });
  };

  private handleConfirm = () => {
    this.props.onConfirm();

    this.close();
  };

  public render() {
    const { isOpen, title } = this.state;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>{title}</ModalHeader>

        <ModalFooter>
          <Button color="primary" onClick={this.handleConfirm}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={this.close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
