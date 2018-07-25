import * as React from 'react';
import { HousingApi } from '../api/Housing';
import { IHousing } from '../interfaces/IHousing';

interface IState {
    housings: any;
}

export default class Homepage extends React.Component<{}, IState> {
    public state: IState = {
        housings: [],
    };

    public componentDidMount() {
        this.fetchAllHousings();
    }

    private fetchAllHousings = () => {
        HousingApi.getAll().then((housings) => {
            this.setState({
                housings,
            })
        });
    }

    public render() {
        const { housings } = this.state;

        return (
            <>
                <h1>This is a Homepage</h1>
                <table style={{ border: "2px solid black" }}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Number of Bedrooms</th>
                            <th>Number of Bathrooms</th>
                            <th>Description</th>
                            <th>Price ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {housings && housings.map((housing: IHousing) =>
                            <tr key={housing.id}>
                                <td>{housing.type}</td>
                                <td>{housing.numberOfBedroom}</td>
                                <td>{housing.numberOfBathroom}</td>
                                <td>{housing.description}</td>
                                <td>{housing.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}