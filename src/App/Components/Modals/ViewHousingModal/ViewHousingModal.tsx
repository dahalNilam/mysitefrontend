import * as React from "react";
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import { IHousing } from "App/Interfaces";
import { HousingType } from "App/Enums/HousingType";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";
import { ImageGallery } from "App/Components/HousingTile/Components";
import { SeeMore } from "App/Components/SeeMore";

interface IState {
  isOpen: boolean;
  housing: IHousing;
}

interface ICallbackProps {
  housing: IHousing;
}

export default class ViewHousingModal extends React.Component<{}, IState>
  implements IModal<ICallbackProps> {
  public type = ModalTypes.ViewHousingModal;

  public show = (params: { housing: IHousing }) => {
    this.setState({
      isOpen: true,
      housing: params.housing
    });
  };

  public close = () => {
    this.setState({
      isOpen: false
    });
  };

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

  public render() {
    const { isOpen, housing } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={this.close} size="lg">
        <ModalHeader>View Housing</ModalHeader>

        <ModalBody>
          {housing.type && (
            <Row>
              <Col>
                <h3>{HousingType[housing.type]}</h3>
              </Col>
            </Row>
          )}
          {housing.images &&
            housing.images.length > 0 && (
              <Row>
                <Col>
                  <ImageGallery images={housing.images} />
                </Col>
              </Row>
            )}
          <Row>
            <Col md={4} lg={4} sm={4}>
              <div>
                Number of Bedroom: <strong>{housing.numberOfBedroom}</strong>
              </div>
              <div>
                Number of Bathroom: <strong>{housing.numberOfBathroom}</strong>
              </div>
            </Col>
            <Col md={8} lg={8} sm={8}>
              <div>
                Description:{" "}
                <SeeMore maxLength={25}>{housing.description}</SeeMore>
              </div>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this.close}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
