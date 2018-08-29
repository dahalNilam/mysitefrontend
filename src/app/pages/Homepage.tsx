import * as React from 'react';
import { HousingApi } from '../Api';
import { IHousing } from '../Interfaces';
import { Menubar } from '../Components/Menubar';
import { HousingTile } from '../Components/HousingTile';
import { AddHousingModal } from '../Components/Modals/AddHousingModal';
import { showModalByType, registerModal } from '../Components/Modals';
import { ModalTypes } from '../Components/Modals/ModalTypes';

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

    private showAddHousingModal = (event: React.MouseEvent<any>) => {
        showModalByType(ModalTypes.AddHousingModal);
    }

    private addHousing = (housing: IHousing) => {
        HousingApi.add(housing).then((res) => {
            this.fetchAllHousings();
        });
    }

    public render() {
        const { housings } = this.state;

        return (
            <>
                <Menubar onAddHousing={this.showAddHousingModal} />
                <h1>This is a Homepage</h1>

                {housings && housings.map((housing: IHousing) =>
                    <HousingTile housing={housing} key={housing.id} />
                )}

                <AddHousingModal ref={registerModal} submit={this.addHousing} />
            </>
        );
    }
}