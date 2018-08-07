import * as React from 'react';
import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, } from 'reactstrap';
import Select from 'react-select';
import ModalWrapper from '../ModalWrapper';
import { IModalProps } from '../IModalProps';
import { HousingApi } from '../../../api/Housing';

interface ISelectOption {
    value: string, label: string
}

interface IState {
    selectedHousingType: ISelectOption
}

export default class AddHousingModal extends React.Component<IModalProps, IState> {
    private static housingTypes = HousingApi.getHousingType();;

    public readonly state: IState = {
        selectedHousingType: { value: "", label: "" }
    }

    private handleHousingTypeChange = (selectedOption: ISelectOption) => {
        this.setState({
            selectedHousingType: selectedOption
        });
    }

    public render() {
        const housingTypes = AddHousingModal.housingTypes;
        const { selectedHousingType } = this.state;

        return (
            <ModalWrapper props={this.props}>
                <Form>
                    <FormGroup row>
                        <Label for="housingType" sm={4} md={4} lg={4}>Type</Label>
                        <Col sm={8} md={8} lg={8}>
                            <Select
                                value={selectedHousingType}
                                onChange={this.handleHousingTypeChange}
                                options={housingTypes}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="noOfBedroom" sm={4} md={4} lg={4}>No of Bedroom</Label>
                        <Col sm={8} md={8} lg={8}>
                            <Input type="number" name="noOfBedroom" id="noOfBedroom" stem="1" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="noOfBathroom" sm={4} md={4} lg={4}>No of Bathroom</Label>
                        <Col sm={8} md={8} lg={8}>
                            <Input type="number" name="noOfBathroom" id="noOfBathroom" step="1" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="price" sm={4} md={4} lg={4}>Price</Label>
                        <Col sm={8} md={8} lg={8}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input type="number" name="price" id="price" />
                            </InputGroup>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="description" sm={4} md={4} lg={4}>Description</Label>
                        <Col sm={8} md={8} lg={8}>
                            <Input type="textarea" name="description" id="description" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="image" sm={4} md={4} lg={4}>Upload Image</Label>
                        <Col sm={8} md={8} lg={8}>
                            <Input type="file" name="image" id="image" />
                        </Col>
                    </FormGroup>
                </Form>
            </ModalWrapper>
        );
    }
}