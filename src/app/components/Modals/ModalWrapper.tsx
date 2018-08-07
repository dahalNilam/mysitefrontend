import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IModalProps } from './IModalProps';

interface IProps {
    props: IModalProps,
}

export default class ModalWrapper extends React.Component<IProps> {
    public render() {
        const { props, children } = this.props;
        const { isOpen, title, submit, close } = props;

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader >{title}</ModalHeader>

                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={submit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={close}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}