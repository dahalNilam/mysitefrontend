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
  ModalFooter,
  Row
} from "reactstrap";
import Select, { Option } from "react-select";
import { HousingApi, ImageApi } from "App/Api";
import { IHousing, IImage } from "App/Interfaces";
import { HousingType } from "App/Enums/HousingType";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";
import SeeMore from "../../SeeMore/SeeMore";

interface IState {
  isOpen: boolean;
  housing: IHousing;
}

interface IProps {
  submit: (housing: IHousing) => void;
}

interface ICallbackProps {
  housing?: IHousing;
}

export default class AddHousingModal extends React.Component<IProps, IState>
  implements IModal<ICallbackProps> {
  public type = ModalTypes.AddHousingModal;

  public show = (params: { housing?: IHousing }) => {
    this.setState({
      isOpen: true
    });

    if (params && params.housing) {
      this.setState({
        housing: params.housing
      });
    }
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
    }
  };

  private handleHousingTypeChange = selectedOption => {
    const type = this.getHousingType(selectedOption);

    this.setState({
      housing: {
        ...this.state.housing,
        type
      }
    });
  };

  private getHousingType = (option): HousingType => {
    const value = option.value ? option.value : "0";

    return parseInt(value, 10) as HousingType;
  };

  private getHousingTypeOption = (type): Option => {
    return { value: type, label: HousingType[type] };
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

    ImageApi.upload(file).then((image: IImage) => {
      let images = this.state.housing.images;

      if (!images) {
        images = [];
      }

      images.push(image);

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
    const { isOpen, housing } = this.state;

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
                  value={this.getHousingTypeOption(housing.type)}
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
                  value={housing.numberOfBedroom ? housing.numberOfBedroom : ""}
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
                  value={
                    housing.numberOfBathroom ? housing.numberOfBathroom : ""
                  }
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
                    value={housing.price ? housing.price : ""}
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
                  value={housing.description ? housing.description : ""}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Row style={{ marginLeft: 0 }}>
                <Col>
                  <CustomInput
                    type="file"
                    id="imageFile"
                    name="customFile"
                    onChange={this.handleImageChange}
                  />
                </Col>
                {housing.images &&
                  housing.images.length > 0 && (
                    <Col sm={4} md={4} lg={4}>
                      {housing.images.length} files selected.
                    </Col>
                  )}
              </Row>
              <Row style={{ marginLeft: 0 }}>
                <Col>
                  {housing.images &&
                    housing.images.map((p, i) => {
                      return (
                        <div key={i}>
                          <SeeMore maxLength={25}>{p.fileName}</SeeMore>
                        </div>
                      );
                    })}
                </Col>
              </Row>
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
