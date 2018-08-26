import * as React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { IHousing } from '../../Interfaces';
import { ImageApi, HousingApi } from '../../Api';
import { HousingType } from '../../Enums/HousingType';
import HousingOptions from './Components/HousingOptions';
import { ConfirmationModal } from '../Modals/ConfirmationModal';
import { registerModal, showModalByType } from '../Modals';
import { ModalTypes } from '../Modals/ModalTypes';
import ImageGallery from './Components/ImageGallery';

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
        isConfirmationModalOpen: false,
    }

    public componentDidMount() {
        const images = this.props.housing.images;

        if (!images || images.length < 1) {
            return;
        }

        const image = images[0];

        if (!image || !image.id) {
            return;
        }

        ImageApi.getById(image.id).then((imageBlob) => {
            this.setState({
                imageBlob
            })
        });
    }

    private editHousing = () => {

    }

    private deleteHousing = () => {
        HousingApi.remove(this.props.housing.id);
    }

    private showConfirmationModal = () => {
        showModalByType(ModalTypes.ConfirmationModal, { title: "Are you sure?" });
    }

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

                <ConfirmationModal
                    ref={registerModal}
                    onConfirm={this.deleteHousing}
                />
            </>
        );
    }
}
