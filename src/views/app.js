import React from 'react';
import Wallet from './wallet/wallet';
import ReflorestationProjects from './projects/reflorestation-projects';
import Home from './home/home';

function Sidebar(props) {

    return (
        <div className='sidebar'>
            <button>News</button>
            <button onClick={() => props.changeView(<ReflorestationProjects
                changeView={props.changeView}
            />)}>
                Reflorestation Projects
            </button>
            <button onClick={() => props.changeView(<Wallet
                changeView={props.changeView}
            />)}>
                Wallet
            </button>
            <button>Market Analysis</button>
            <button>Messages</button>
            <button>Help</button>
        </div>
    );
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentView: <Home />,
        };
    }

    changeView = (view) => {
        this.setState({currentView: view});
    }

    render() {
        return (
            <div>
                <div className='header'
                     onClick={() => this.changeView(<Home />)}>
                    <img src='/resources/user.png'
                         alt='pfp'
                         className='profilepic'
                    />
                    <span className='username'>
                        User
                    </span>
                    <input className='searchbar'
                           type="text"
                           placeholder='Search'
                    />
                </div>
                <Sidebar changeView={this.changeView} />
                {this.state.currentView}
                <div className='footer'></div>
            </div>
        );
    }
}

export default App;
