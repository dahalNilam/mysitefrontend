import * as React from 'react';
import { HousingApi } from '../api/Housing';
import { IHousing } from '../interfaces/IHousing';
import { Menubar } from '../components/Menubar';
import { ImageTile } from '../components/ImageTile';

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
                <Menubar />
                <h1>This is a Homepage</h1>

                {housings && housings.map((housing: IHousing) =>
                    <div key={housing.id}>
                        <ImageTile housing={housing} />
                    </div>
                )}
            </>
        );
    }
}