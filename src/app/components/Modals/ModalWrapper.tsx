import * as React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

import { IModalProps } from './IModalProps';

interface IProps {
    props: IModalProps,
}

export default class ModalWrapper extends React.Component<IProps> {
    public render() {
        const { props, children } = this.props;
        const { isOpen, close, title } = props;

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader>
                        {title}
                        <Button onClick={close} style={{ float: "right" }}>
                            Close
                        </Button>
                    </ModalHeader>

                    {children}
                </Modal>
            </div>
        );
    }

}