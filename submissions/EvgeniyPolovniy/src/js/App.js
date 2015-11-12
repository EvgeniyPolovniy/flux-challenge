import React from 'react';
import InitSocket from './InitSocket';
import {Store} from './Store';
import Constants from './Constants';
import {SithStorage} from './SithStorage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPlanet: Store.getPlanet(),
      sithList: Store.getSithList(),
      danger: Store.isDanger()
    };

    this.changePlanet = this.changePlanet.bind(this);
    this.changeSithList = this.changeSithList.bind(this);
  }
  componentWillMount() {
    InitSocket.init();
    SithStorage.init();
    Store.bind(Constants.CHANGE_CURRENT_PLANET, this.changePlanet );
    Store.bind(Constants.CHANGE_SITH_LIST, this.changeSithList );
  }
  componentWillUnmount() {
    InitSocket.close();
    Store.unbind(Constants.CHANGE_CURRENT_PLANET, this.changePlanet );
    Store.unbind(Constants.CHANGE_SITH_LIST, this.changeSithList );
  }
  changePlanet() {
    this.setState({curentPlanet: Store.getPlanet()});
  }
  changeSithList() {
    this.setState({sithList: Store.getSithList()});
  }
  render() {
    return (
      <div className="css-root">
        <CurentPlanetView curentPlanet={this.state.curentPlanet} />

        <MainContentView sithList={this.state.sithList} curentPlanet={this.state.curentPlanet} />

      </div>
    ); 
  }
}

class CurentPlanetView extends React.Component {
  render() {
    return (
      <h1 className="css-planet-monitor">Obi-Wan currently on {this.props.curentPlanet.name}</h1>
    );
  }
}

class MainContentView extends React.Component {
  render() {
    let planet = this.props.curentPlanet;
    let list = this.props.sithList;
    return (
      <section className="css-scrollable-list">

        <ul className="css-slots">
          {list.map(function(sith, i){
            return <SithSlotView planet={planet} sith={sith} key={i} />;
          })}
        </ul>

        <ButtonView list={list}/>

      </section>
    );
  }
}

class ButtonView extends React.Component {
  upButtonView() {
    if ((this.props.list[0] == null) || (this.props.list[0].master.id == null) || Store.isDanger()) {
      return (<button className="css-button-up css-button-disabled" ></button>);
    } else {
      return (<button className="css-button-up" onClick={SithStorage.upButton} ></button>);
    }
  }
  downButtonView() {
    if ((this.props.list[4] == null) || (this.props.list[4].apprentice.id == null) || Store.isDanger()) {
      return (<button className="css-button-down css-button-disabled" ></button>);
    } else {
      return (<button className="css-button-down" onClick={SithStorage.downButton} ></button>);
    }
  }
  render() {
    return (
      <div className="css-scroll-buttons">
        {this.upButtonView()}
        {this.downButtonView()}
      </div>
    );
  }
}

class SithSlotView extends React.Component {
  render() {
    let name, homeworld, curentClass = 'css-slot';
    if (this.props.sith != null) {
      name = this.props.sith.name;
      homeworld = 'Homeworld: ' + this.props.sith.homeworld.name;
      curentClass = (this.props.sith.homeworld.name == this.props.planet.name) ? "css-slot css-slot-red" : "css-slot";
    }
    return (
      <li className={curentClass}>
        <h3>{name}</h3>
        <h6>{homeworld}</h6>
      </li>
    );
  }
}