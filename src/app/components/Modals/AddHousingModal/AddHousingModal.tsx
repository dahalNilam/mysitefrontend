import * as React from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Select, { Option } from "react-select";
import { HousingApi, ImageApi } from "App/Api";
import { IHousing } from "App/Interfaces";
import { HousingType } from "App/Enums/HousingType";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";

interface IState {
  isOpen: boolean;
  housing: IHousing;
  selectedHousingType: Option;
}

interface IProps {
  submit: (housing: IHousing) => void;
}

interface ICallbackProps {}

export default class AddHousingModal extends React.Component<IProps, IState>
  implements IModal<ICallbackProps> {
  public type = ModalTypes.AddHousingModal;

  public show = () => {
    this.setState({
      isOpen: true
    });
  };

  public close = () => {
    this.setState({
      isOpen: false
    });
  };

  private static housingTypes = HousingApi.getHousingType();

  public readonly state: IState = {
    isOpen: false,
    housing: {
      id: -1,
      price: 0,
      type: HousingType.Apartment,
      numberOfBedroom: 0,
      numberOfBathroom: 0,
      description: "",
      images: []
    },
    selectedHousingType: { value: "", label: "" }
  };

  private handleHousingTypeChange = selectedOption => {
    this.setState({
      selectedHousingType: selectedOption
    });

    const value = selectedOption.value ? selectedOption.value : "0";

    const type = parseInt(value, 10) as HousingType;

    this.setState({
      housing: {
        ...this.state.housing,
        type
      }
    });
  };

  private handleNumberOfBedroomChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfBedroom = parseInt(event.target.value, 10);

    this.setState({
      housing: {
        ...this.state.housing,
        numberOfBedroom
      }
    });
  };

  private handleNumberOfBathroomChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfBathroom = parseInt(event.target.value, 10);

    this.setState({
      housing: {
        ...this.state.housing,
        numberOfBathroom
      }
    });
  };

  private handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(event.target.value, 10);

    this.setState({
      housing: {
        ...this.state.housing,
        price
      }
    });
  };

  private handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const description = event.target.value;

    this.setState({
      housing: {
        ...this.state.housing,
        description
      }
    });
  };

  private handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      return;
    }

    ImageApi.upload(file).then(() => {
      let images = this.state.housing.images;

      if (!images) {
        images = [];
      }

      images.push({ fileName: file.name });

      this.setState({
        housing: {
          ...this.state.housing,
          images
        }
      });
    });
  };

  private handleSubmitForm = () => {
    this.props.submit(this.state.housing);

    this.close();
  };

  public render() {
    const { isOpen } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={this.close}>
        <ModalHeader>Add New Housing</ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="housingType" sm={4} md={4} lg={4}>
                Type
              </Label>
              <Col sm={8} md={8} lg={8}>
                <Select
                  value={this.state.selectedHousingType}
                  onChange={this.handleHousingTypeChange}
                  options={AddHousingModal.housingTypes}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="noOfBedroom" sm={4} md={4} lg={4}>
                No of Bedroom
              </Label>
              <Col sm={8} md={8} lg={8}>
                <Input
                  onChange={this.handleNumberOfBedroomChange}
                  type="number"
                  name="noOfBedroom"
                  id="noOfBedroom"
                  stem="1"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="noOfBathroom" sm={4} md={4} lg={4}>
                No of Bathroom
              </Label>
              <Col sm={8} md={8} lg={8}>
                <Input
                  onChange={this.handleNumberOfBathroomChange}
                  type="number"
                  name="noOfBathroom"
                  id="noOfBathroom"
                  step="1"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="price" sm={4} md={4} lg={4}>
                Price
              </Label>
              <Col sm={8} md={8} lg={8}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                  <Input
                    onChange={this.handlePriceChange}
                    type="number"
                    name="price"
                    id="price"
                  />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="description" sm={4} md={4} lg={4}>
                Description
              </Label>
              <Col sm={8} md={8} lg={8}>
                <Input
                  onChange={this.handleDescriptionChange}
                  type="textarea"
                  name="description"
                  id="description"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={8} md={8} lg={8}>
                <CustomInput
                  type="file"
                  id="imageFile"
                  name="customFile"
                  onChange={this.handleImageChange}
                />
              </Col>
              <Col sm={4} md={4} lg={4}>
                {this.state.housing.images &&
                  this.state.housing.images.map((p, i) => {
                    <Label>
                      {i}> {p.fileName}
                    </Label>;
                  })}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmitForm}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={this.close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
