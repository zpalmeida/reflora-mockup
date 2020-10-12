import React from 'react';
import Chart from 'react-google-charts';
import Project from '../projects/project';
import userController from '../../controllers/user-controller';
import projectsController from '../../controllers/projects-controller';

function WalletRow(props) {
    let investment = (props.project.price * props.project.purchasedCredits)
        .toLocaleString().replaceAll(',', ' ');

    let credits = props.project.purchasedCredits
        .toLocaleString().replaceAll(',', ' ');

    return(
        <tr
            className='wallettablerow'
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
            <td className='investment'>
                € {investment}.00
            </td>
            <td className='centereddata'>
                {credits}
            </td>
            <td className='centereddata'>
                {props.project.maturityDate}
            </td>
        </tr>
    );
}

function WalletFirstRow() {
    return(
        <tr>
            <th>Project</th>
            <th>Promoter</th>
            <th>Score</th>
            <th>Investment</th>
            <th>Credits</th>
            <th>Maturity Date</th>
        </tr>
    );
}

function WalletTable(props) {
    if (props.userController.getInvestments().length === 0) {
        return(
            <table className='wallettable'>
                <tbody>
                    <WalletFirstRow />
                </tbody>
            </table>
        );
    }

    return(
        <table className='wallettable'>
            <tbody>
                <WalletFirstRow />
                {props.userController.getInvestments()
                    .map(project => <WalletRow
                        key={project.key}
                        project={project}
                        changeView={props.changeView}
                    />)
                }
            </tbody>
        </table>
    );
}

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userController: userController,
            projectsController: projectsController,
        };
    }
    
    createChartData() {

        const emissions = [
            4167, 8333, 12500, 16667, 20833, 25000,
            29167, 33333, 37500, 41667, 45833, 50000
        ];
        const userController = this.state.userController;
        let data = [['Months', 'Emissions', 'Compensation']];
        let now = new Date();
        let i = 0;

        emissions.forEach((value) => {
            let firstDayOfTheMonth = new Date(now.getFullYear(), i, 1);
            i++;

            if(now > firstDayOfTheMonth) {
                data.push([firstDayOfTheMonth, value, 0]);
                return;
            }

            data.push([
                firstDayOfTheMonth,
                value,
                userController.getPurchasedCredits()
            ]);
        });

        return data;
    }

    calculateOffset() {
        let percent = this.state.userController.calculatePercent();

        if(percent > 100) return 0;
        
        return 471 - (percent * 4.71);
    }

    render() {
        let data = this.createChartData();

        let purchasedCredits = this.state
            .userController.getPurchasedCredits()
            .toLocaleString().replaceAll(',', ' ');

        let investedCapital = this.state
            .userController.getInvestedCapital()
            .toLocaleString().replaceAll(',', ' ');

        let percent = Math.round(
            this.state.userController.calculatePercent()
        );

        let averageMarketPrice = this.state.projectsController
            .calculateAverageMarketPrice().toFixed(2);

        let averageCreditPrice = this.state.userController
            .calculateAverageCreditPrice().toFixed(2);

        return(
            <div className='wallet'>
                <div className='walletpointer'></div>
                <span className='tagline'>
                    This is your impact strategy.
                </span>
                <Chart 
                    className='walletgraph'
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        legend: 'none',
                        colors: ['#59CF46', '#9CA3A7'],
                        chartArea: {
                            left: 10, top: 0,
                            width: '95%', height: '90%'
                        },
                        hAxis: {
                            gridlines: {
                                units: {
                                    months: {format: ['MMM']}
                                }
                            },
                            textStyle: {color: '#A3A3A3'}
                        },
                        vAxis: {
                            minorGridlines: {count: 0 },
                            gridlines: {count: 0 },
                            viewWindowMode: 'maximized',
                            textPosition: 'none',
                        },
                    }}
                />
                <div className='walletwheel'>
                    <svg>
                        <circle
                            id='circle'
                            strokeDashoffset={this.calculateOffset()}
                        />
                    </svg>
                    <span className='percent'>
                        {percent} %
                    </span>
                    <span className='wheeltext'>Compensated</span>
                </div>
                <WalletTable
                    userController={this.state.userController}
                    changeView={this.props.changeView}
                />
                <table className='walletoverview'>
                    <tbody>
                        <tr>
                            <th>Overview</th>
                        </tr>
                        <tr>
                            <td>Purchased Credits</td>
                            <td className='centereddata'>
                                {purchasedCredits}
                            </td>
                        </tr>
                        <tr>
                            <td>Invested Capital</td>
                            <td className='centereddata'>
                                € {investedCapital}.00
                            </td>
                        </tr>
                        <tr>
                            <td>Average Credit Price</td>
                            <td className='centereddata'>
                                € {isNaN(averageCreditPrice) ?
                                    '0.00' : averageCreditPrice}
                            </td>
                        </tr>
                        <tr>
                            <td>Average Market Price</td>
                            <td className='centereddata'>
                                € {averageMarketPrice}
                            </td>
                        </tr>
                        <tr>
                            <td>Carbon Emissions</td>
                            <td className='centereddata'>50 000</td>
                        </tr>
                    </tbody>
                </table>
                <div className='walletlabels'>
                    <span className='labelstext'>Labels</span>
                    <img
                        src='/resources/co2-label.png'
                        alt='co2neutral'
                        className='co2neutral'
                    />
                    <img
                        src='/resources/carbontrust-label.png'
                        alt='carbonneutral'
                        className='carbonneutral'
                    />
                </div>
                <div className='walletimpact'>
                    <span>SDGs</span>
                    <img
                        src='/resources/13.png'
                        alt='sdg13'
                        className='sdg'
                    />
                    <img
                        src='/resources/15.png'
                        alt='sdg15'
                        className='sdg'
                    />
                    <img
                        src='/resources/8.png'
                        alt='sdg8'
                        className='sdg'
                    />
                </div>
            </div>
        );
    }
}

export default Wallet;
