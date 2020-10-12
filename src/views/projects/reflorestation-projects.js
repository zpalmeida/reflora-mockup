import React from 'react';
import Modal from './modal';
import Project from './project';
import projectsController from '../../controllers/projects-controller';

function ProjectsRow(props) {

    return(
        <tr className='projectsrow'
            onClick={
                () => props.changeView(<Project
                    project={props.project}
                    changeView={props.changeView}
                />)
            }
        >
            <td>{props.project.name}</td>
            <td>{props.project.promoter}</td>
            <td>{props.project.score}</td>
            <td>€{props.project.price}.00
            <button
                className='quickbuybutton'
                onClick={
                    (e) => {
                        e.stopPropagation();
                        props.openModal(props.project)
                    }
                }
            >
                B
            </button>
            </td>
            <td>{props.project.location}</td>
        </tr>
    );
}

class ReflorestationProjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            modalProject: null,
            controller: projectsController,
        };
    }

    openModal = (project) => {
        this.setState({modalOpen: true, modalProject: project});
    }

    closeModal = () => {
        this.setState({modalOpen: false});
    }

    render() {
        const keyArray = [1, 2, 3, 4, 5, 6, 7, 8];

        return(
            <div>
                <div className='projectspointer'></div>
                <table className='projectstable'>
                    <tbody>
                        <tr className='projectsfirstrow'>
                            <th>Project</th>
                            <th>Promoter</th>
                            <th>Score</th>
                            <th>Price</th>
                            <th>Location</th>
                        </tr>
                        {keyArray.map(key => <ProjectsRow
                            key={key}
                            project={this.state.controller.getProject(key)}
                            changeView={this.props.changeView}
                            openModal={this.openModal}
                        />)}
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.modalOpen}
                    closeModal={this.closeModal}
                    project={this.state.modalProject}
                />
            </div>
        );
    }
}

export default ReflorestationProjects;
