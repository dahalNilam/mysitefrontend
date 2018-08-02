import * as React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { IHousing } from '../../interfaces/IHousing';
import { ImageApi } from '../../api/Image';
import { HousingType } from '../../enums/HousingType';

interface IProps {
    housing: IHousing
}

interface IState {
    imageBlob: {}
}

export default class ImageTile extends React.Component<IProps, IState> {
    public readonly state = {
        imageBlob: ""
    }

    public componentDidMount() {
        ImageApi.getById(this.props.housing.images[0].id).then((imageBlob) => {
            this.setState({
                imageBlob
            })
        });
    }

    public render() {
        const housing = this.props.housing;
        const imageBlob = this.state.imageBlob;

        return (
            <Card style={{ width: 350, height: 400, margin: 5, float: "left" }}>
                <CardTitle style={{ textAlign: "center", marginTop: 5 }}>{HousingType[housing.type]}</CardTitle>

                <div style={{ width: 320, height: "auto", marginLeft: 15 }}>
                    <CardImg top width="100%" src={imageBlob} />
                </div>

                <CardBody>
                    <CardSubtitle>Price: ${housing.price}</CardSubtitle>
                    <CardText>Desc: {housing.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}
