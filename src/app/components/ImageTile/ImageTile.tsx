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
        const { housing } = this.props;

        if (!housing.images || housing.images.length < 1) {
            return;
        }

        ImageApi.getById(housing.images[0].id).then((imageBlob) => {
            this.setState({
                imageBlob
            })
        });
    }

    public render() {
        const housing = this.props.housing;

        return (
            <Card style={{ width: 350, height: 400, margin: 5, float: "left" }}>
                <CardTitle style={{ textAlign: "center", marginTop: 5 }}>
                    {housing.type && HousingType[housing.type]}
                </CardTitle>

                <div style={{ width: 320, height: "auto", marginLeft: 15 }}>
                    <CardImg top width="100%" src={this.state.imageBlob} />
                </div>

                <CardBody>
                    <CardSubtitle>Price: ${housing.price}</CardSubtitle>
                    <CardText>Desc: {housing.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}
