import React from 'react';
import userController from '../../controllers/user-controller';
import projectsController from '../../controllers/projects-controller';

function PurchaseComplete(props) {
    if(!props.open) return null;

    return(
        <div className='modal'>
            <div className='modaltop'>
                <span>Transaction completed</span>
            </div>
            <div className='modalbottom'>
                <span>
                    Your investment has contributed to the removal of {props.removedtons()} tons on CO2 from the atmosphere.
                </span>
                <br/>
                <button onClick={props.closeModal}>Close</button>
            </div>
        </div>
    );
}

class PurchasePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseComplete: false,
            amountIsValid: true,
            total: null,
            userController: userController,
            projectsController: projectsController,
        };
    }

    getAmount() {
        let amount = document.getElementById('amount').value;
        return amount;
    }

    isValid(amount) {
        return(
            amount.includes('.') ||
            amount === '0' ||
            amount === '' ||
            amount > this.props.project.availableAmount
        );
    }

    totalWrapper() {
        if(!this.state.amountIsValid) {
            return(
                <span className='warning'>
                    Please insert a valid amount of Credits.
                </span>
            );
        };

        if(this.state.total === null) {
            return <span>€{this.props.project.price}.00</span>;
        }

        return <span>€{this.state.total}.00</span>;
    }

    calculateTotal = () => {

        if(this.isValid(this.getAmount())) {
            this.setState({amountIsValid: false});
            document.getElementById('purchaseButton').disabled = true;
            return;
        };

        this.setState({amountIsValid: true});
        document.getElementById('purchaseButton').disabled = false;
        this.setState({
            total: this.props.project.price * this.getAmount()
        });
    }

    purchase = () => {

        this.setState({purchaseComplete: true});

        this.state.projectsController.spendCredits(
            this.props.project.key, this.getAmount()
        );

        document.getElementById('purchaseButton').disabled = true;
        document.getElementById('cancelButton').disabled = true;

        this.state.userController.registerPurchase(
            this.props.project,
            this.getAmount(),
            this.props.project.price * this.getAmount()
        );
    }

    cancel = () => {
        this.props.closeModal();
        this.setState({purchaseComplete: false, total: null});
    }

    render() {
        let availableAmount = this.props.project
            .availableAmount.toLocaleString().replaceAll(',', ' ');

        return(
            <div>
                <div
                    className='behindmodal'
                    onClick={this.cancel}
                ></div>
                <div className='modal'>
                    <div className='modalleft'>
                        <p>{this.props.project.name}</p>
                        <p>{this.props.project.promoter}</p>
                        <p>{this.props.project.score}</p>
                        <span className='availablecredits'>
                            Available Credits:
                        </span>
                        <div className='modalbox'>
                            {availableAmount}
                        </div>
                    </div>
                    <div className='modalright'>
                        <div className='cancelbutton'>
                            <button
                                id='cancelButton'
                                onClick={this.cancel}
                            >X</button>
                        </div>
                        <table className='modaltable'>
                            <tbody>
                                <tr>
                                    <td>Price/Carbon Credit:</td>
                                    <td>
                                        <div className='modalbox'>
                                            €{this.props.project.price}.00
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Carbon Credits: </td>
                                    <td>
                                        <input
                                            id='amount'
                                            defaultValue='1'
                                            onChange={this.calculateTotal}
                                            type='number'
                                            min='1'
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Amount:</td>
                                    <td>
                                        <div className='modalbox'>
                                            {this.totalWrapper()}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            id='purchaseButton'
                            className='purchasebutton'
                            onClick={this.purchase}
                        >
                            Buy Credits
                        </button>
                        <PurchaseComplete
                            open={this.state.purchaseComplete}
                            closeModal={this.cancel}
                            removedtons={this.getAmount}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function Modal(props) {
    if(!props.isOpen) return null;

    if(props.project.availableAmount <= 0) {
        return(
            <div>
                <div
                    className='behindmodal'
                    onClick={props.closeModal}
                ></div>
                <div className='modal'>
                    <p>{props.project.name}</p>
                    <p>
                        There are currently no Credits available for purchase.
                    </p>
                    <button
                        id='cancelButton'
                        onClick={props.closeModal}
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    };

    return(
        <PurchasePanel
            isOpen={props.isOpen}
            closeModal={props.closeModal}
            project={props.project}
        />
    );
}

export default Modal;
