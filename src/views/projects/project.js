import React from 'react';
import projectsController from '../../controllers/projects-controller';
import ReflorestationProjects from './reflorestation-projects';
import Modal from './modal';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            controller: projectsController,
        }
    }

    openModal = () => {
        this.setState({modalOpen: true});
    }

    closeModal = () => {
        this.setState({modalOpen: false});
    }

    goBack = () => {
        this.props.changeView(<ReflorestationProjects
            changeView={this.props.changeView}
        />);
    }

    render() {
        let impactSDGs = this.state.controller
            .getSDGPaths(this.props.project.impact);

        return(
            <div>
                <div className='project'>
                    <div className='projectspointer'></div>
                    <button
                        className='backbutton'
                        onClick={this.goBack}
                    >
                        <p>Back to Projects List</p>
                    </button>
                    <div className='projectimages'></div>
                    <div className='projectdescription'>
                        <span>{this.props.project.description}</span>
                    </div>
                    <div className='projectinfo'>
                        <p>{this.props.project.name}</p>
                        <p>{this.props.project.promoter}</p>
                        <p>{this.props.project.location}</p>
                        <p>€{this.props.project.price}.00/Carbon Credit</p>
                        <p>
                            {this.props.project.availableAmount} Credits Available
                        </p>
                        <p>{this.props.project.score}</p>
                    </div>
                    <button
                        className='buybutton'
                        onClick={this.openModal}
                    >
                        Buy Credits
                    </button>
                    <div className='projectimpact'>
                        {impactSDGs.map(sDG => <img key={sDG}
                                                src={sDG}
                                                alt={sDG}
                                                className='sdg'
                                            />)}
                    </div>
                    <img
                        src='/resources/map.png'
                        alt='map'
                        className='projectmap'
                    />
                    <div className='projectreports'></div>
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    closeModal={this.closeModal}
                    project={this.props.project}
                />
            </div>
        )
    }
}

export default Project;
