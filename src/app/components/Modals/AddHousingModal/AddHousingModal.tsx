import * as React from 'react';
import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import ModalWrapper from '../ModalWrapper';
import { IModalProps } from '../IModalProps';
import { HousingApi } from '../../../api/Housing';
import { IHousing } from '../../../interfaces/IHousing';
import { HousingType } from '../../../enums/HousingType';

interface ISelectOption {
    value: string, label: string
}

interface IState {
    housing: IHousing,
    selectedHousingType: ISelectOption,
}

interface IProps extends IModalProps {
    submit: (housing: IHousing) => void
}

export default class AddHousingModal extends React.Component<IProps, IState> {
    private static housingTypes = HousingApi.getHousingType();;

    public readonly state: IState = {
        housing: {
            price: 0,
            type: HousingType.Apartment,
            numberOfBedroom: 0,
            numberOfBathroom: 0,
            description: "",
            images: [],
        },
        selectedHousingType: { value: "", label: "" },
    }

    private handleHousingTypeChange = (selectedOption: ISelectOption) => {
        this.setState({
            selectedHousingType: selectedOption,
        });

        const type = parseInt(selectedOption.value, 10) as HousingType;

        this.setState({
            housing: {
                ...this.state.housing,
                type,
            }
        });
    }

    private handleNumberOfBedroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numberOfBedroom = parseInt(event.target.value, 10);

        this.setState({
            housing: {
                ...this.state.housing,
                numberOfBedroom,
            }
        });
    }

    private handleNumberOfBathroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numberOfBathroom = parseInt(event.target.value, 10);

        this.setState({
            housing: {
                ...this.state.housing,
                numberOfBathroom,
            }
        });
    }

    private handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(event.target.value, 10);

        this.setState({
            housing: {
                ...this.state.housing,
                price,
            }
        });
    }

    private handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;

        this.setState({
            housing: {
                ...this.state.housing,
                description,
            }
        });
    }

    private handleSubmitForm = () => {
        this.props.submit(this.state.housing);
    }

    public render() {
        return (
            <ModalWrapper props={this.props}>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="housingType" sm={4} md={4} lg={4}>Type</Label>
                            <Col sm={8} md={8} lg={8}>
                                <Select
                                    value={this.state.selectedHousingType}
                                    onChange={this.handleHousingTypeChange}
                                    options={AddHousingModal.housingTypes}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="noOfBedroom" sm={4} md={4} lg={4}>No of Bedroom</Label>
                            <Col sm={8} md={8} lg={8}>
                                <Input defaultValue={"1"} onChange={this.handleNumberOfBedroomChange} type="number" name="noOfBedroom" id="noOfBedroom" stem="1" />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="noOfBathroom" sm={4} md={4} lg={4}>No of Bathroom</Label>
                            <Col sm={8} md={8} lg={8}>
                                <Input defaultValue={"1"} onChange={this.handleNumberOfBathroomChange} type="number" name="noOfBathroom" id="noOfBathroom" step="1" />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="price" sm={4} md={4} lg={4}>Price</Label>
                            <Col sm={8} md={8} lg={8}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                    <Input defaultValue={"1"} onChange={this.handlePriceChange} type="number" name="price" id="price" />
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="description" sm={4} md={4} lg={4}>Description</Label>
                            <Col sm={8} md={8} lg={8}>
                                <Input defaultValue={"1"} onChange={this.handleDescriptionChange} type="textarea" name="description" id="description" />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmitForm}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </ModalFooter>

            </ModalWrapper>
        );
    }
}