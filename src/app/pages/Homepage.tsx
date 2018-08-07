import * as React from 'react';
import { HousingApi } from '../api/Housing';
import { IHousing } from '../interfaces/IHousing';
import { Menubar } from '../components/Menubar';
import { ImageTile } from '../components/ImageTile';
import { AddHousingModal } from '../components/Modals/AddHousingModal';

interface IState {
    housings: any;
    isAddHousingModalOpen: boolean;
}

export default class Homepage extends React.Component<{}, IState> {
    public state: IState = {
        housings: [],
        isAddHousingModalOpen: false,
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

    private openAddHousingModal = () => {
        this.toggleAddHousingModal();
    }

    private closeAddHousingModal = () => {
        this.toggleAddHousingModal();
    }

    private addHousing = () => {
        console.log("Add Housing");

        this.toggleAddHousingModal();
    }

    private toggleAddHousingModal = () => {
        this.setState({
            isAddHousingModalOpen: !this.state.isAddHousingModalOpen
        });
    }

    public render() {
        const { housings } = this.state;

        return (
            <>
                <Menubar onAddHousing={this.openAddHousingModal} />
                <h1>This is a Homepage</h1>

                {housings && housings.map((housing: IHousing) =>
                    <ImageTile housing={housing} key={housing.id} />
                )}

                <AddHousingModal
                    isOpen={this.state.isAddHousingModalOpen}
                    title="Add New Housing"
                    submit={this.addHousing}
                    close={this.closeAddHousingModal}
                />
            </>
        );
    }
}