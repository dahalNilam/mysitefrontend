import * as React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

interface IProps {
    isOpen: boolean,
    close: () => void,
    confirm: () => void
}

export default class ConfirmationModal extends React.Component<IProps> {
    public render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>
                    Are you sure?
                </ModalHeader>

                <ModalFooter>
                    <Button color="primary" onClick={this.props.confirm}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}