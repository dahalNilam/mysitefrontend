import * as React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { IHousing } from "App/Interfaces";
import { ImageApi, HousingApi } from "App/Api";
import { HousingType } from "App/Enums/HousingType";
import { ConfirmationModal } from "App/Components/Modals/ConfirmationModal";
import { registerModal, showModalByType } from "App/Components/Modals";
import { ModalTypes } from "App/Components/Modals/ModalTypes";
import { HousingOptions, ImageGallery } from "./Components";

interface IProps {
  housing: IHousing;
}

interface IState {
  imageBlob: {};
  isConfirmationModalOpen: boolean;
}

export default class HousingTile extends React.Component<IProps, IState> {
  public readonly state = {
    imageBlob: "",
    isConfirmationModalOpen: false
  };

  public componentDidMount() {
    const images = this.props.housing.images;

    if (!images || images.length < 1) {
      return;
    }

    const image = images[0];

    if (!image || !image.id) {
      return;
    }

    ImageApi.getById(image.id).then(imageBlob => {
      this.setState({
        imageBlob
      });
    });
  }

  private editHousing = () => {
    showModalByType(ModalTypes.AddHousingModal, {
      housing: this.props.housing
    });
  };

  private deleteHousing = () => {
    HousingApi.remove(this.props.housing.id);
  };

  private showConfirmationModal = () => {
    showModalByType(ModalTypes.ConfirmationModal, { title: "Are you sure?" });
  };

  public render() {
    const housing = this.props.housing;

    return (
      <>
        <Card style={{ width: 350, height: 400, margin: 5, float: "left" }}>
          <CardTitle style={{ marginTop: 5 }}>
            <span style={{ float: "left", marginLeft: 10 }}>
              {housing.type && HousingType[housing.type]}
            </span>
            <span style={{ float: "right", marginRight: 10 }}>
              <HousingOptions
                edit={this.editHousing}
                delete={this.showConfirmationModal}
              />
            </span>
          </CardTitle>

          <div style={{ width: 320, height: "auto", marginLeft: 15 }}>
            {housing.images && <ImageGallery images={housing.images} />}
          </div>

          <CardBody>
            <CardSubtitle>Price: ${housing.price}</CardSubtitle>
            <CardText>Desc: {housing.description}</CardText>
          </CardBody>
        </Card>

        <ConfirmationModal ref={registerModal} onConfirm={this.deleteHousing} />
      </>
    );
  }
}
