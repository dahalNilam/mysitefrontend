import * as React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { IHousing } from '../../interfaces/IHousing';
import { ImageApi } from '../../api/Image';

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
            <div>
                <Card>
                    <CardImg top width="100%" src={imageBlob} alt="Card image cap" style={{ width: "400px" }} />
                    <CardBody>
                        <CardTitle>{housing.type}</CardTitle>
                        <CardSubtitle>{housing.price}</CardSubtitle>
                        <CardText>{housing.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
