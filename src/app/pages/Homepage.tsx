import * as React from "react";
import { HousingApi } from "App/Api";
import { IHousing } from "App/Interfaces";
import { Menubar } from "App/Components/Menubar";
import { HousingTile } from "App/Components/HousingTile";
import { AddHousingModal } from "App/Components/Modals/AddHousingModal";
import { showModalByType, registerModal } from "App/Components/Modals";
import { ModalTypes } from "App/Components/Modals/ModalTypes";

interface IState {
  housings: IHousing[];
  isAddHousingModalOpen: boolean;
}

export default class Homepage extends React.Component<{}, IState> {
  public state: IState = {
    housings: [],
    isAddHousingModalOpen: false
  };

  public componentDidMount() {
    this.fetchAllHousings();
  }

  private fetchAllHousings = () => {
    HousingApi.getAll().then(housings => {
      this.setState({
        housings
      });
    });
  };

  private showAddHousingModal = (event: React.MouseEvent<any>) => {
    showModalByType(ModalTypes.AddHousingModal);
  };

  private addHousing = (housing: IHousing) => {
    if (housing.id && housing.id > 0) {
      HousingApi.update(housing).then(response => {
        const updatedHousings = this.state.housings.map(p => {
          if (p.id === response.id) {
            return response;
          }
          return p;
        });

        this.setState({
          housings: updatedHousings
        });
      });
    } else {
      HousingApi.add(housing).then(response => {
        this.setState({
          housings: [...this.state.housings, response]
        });
      });
    }
  };

  public render() {
    const { housings } = this.state;

    return (
      <>
        <Menubar onAddHousing={this.showAddHousingModal} />
        <div style={{ marginTop: 50 }}>
          {housings &&
            housings.map((housing: IHousing) => (
              <HousingTile housing={housing} key={housing.id} />
            ))}
        </div>

        <AddHousingModal ref={registerModal} submit={this.addHousing} />
      </>
    );
  }
}
