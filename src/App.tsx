import React from 'react';
import './App.css';

import tasksData from './sample/tasks.json';
import Tasks from "./components/tasks";

/*type CardProps = {
    myText: string,
    subTitle: string
}

/*const Helloworld: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div id="hello">Toma: {props.myText} <h3>{props.subTitle}</h3></div>
    )
};

class Helloworld extends React.Component<CardProps> {
    state = {
        show: true
    };

    toggleShow(showData: boolean) {
        this.setState({show: !showData})
    }

    render() {
        if (this.state.show) {
            return (
                <div id="hello">Toma: {this.props.myText} <h3>{this.props.subTitle}</h3>
                    <button onClick={() => this.toggleShow(this.state.show)}>Toogle</button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>NO hay elementos</h1>
                    <button onClick={() => this.toggleShow(this.state.show)}>Toogle</button>
                </div>)
        }
    }
}

const App: React.FC = () => {
    return (
        <div> Hola Mundo!
            <Helloworld myText="hola" subTitle="oleee"/>
        </div>
    );
};*/

class App extends React.Component {

    state = {
        tasks: tasksData
    };

    render() {
        return <div>
            <Tasks tasks={this.state.tasks}/>
        </div>;
    }
}


export default App;
