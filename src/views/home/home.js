import React from 'react';
import userController from '../../controllers/user-controller';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: userController,
        };
    }

    render() {
        let purchasedCredits = this.state
            .controller.getPurchasedCredits()
            .toLocaleString().replaceAll(',', ' ');

        let investedCapital = this.state
            .controller.getInvestedCapital()
            .toLocaleString().replaceAll(',', ' ');

        let percent = Math.round(
            this.state.controller.calculatePercent()
        );

        let plantedTrees = (300 * this.state.controller
            .getPurchasedCredits()).toLocaleString()
            .replaceAll(',', ' ');

        return(
            <div className='home'>
                <News />
                <span className='impactheader'>Your Impact</span>
                <div className='impacttable'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Captured CO2</th>
                                <td>{purchasedCredits} Tons</td>
                            </tr>
                            <tr>
                                <th>Represents</th>
                                <td>{percent}% YE</td>
                            </tr>
                            <tr>
                                <th>Planted Trees</th>
                                <td>{plantedTrees}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <span className='balanceheader'>Your Balance</span>
                <div className='balancetable'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Invested Capital</th>
                                <td>€ {investedCapital}.00</td>
                            </tr>
                            <tr>
                                <th>Purchased Credits</th>
                                <td>{purchasedCredits}</td>
                            </tr>
                            <tr>
                                <th>Market Value</th>
                                <td>€ {investedCapital}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function News() {
    const firstURL = 'https://www.businessgreen.com/news/4019984/climate-assembly-uk-demands-strong-government-leadership-net-zero';
    const firstImageURL = 'https://www.businessgreen.com/api/v1/wps/3a5f10e/d9d64696-3f71-4364-b76c-61f7af8bcf40/3/ClimateChangeEdit-17-580x358.jpg'
    const secondURL = 'https://www.thetimes.co.uk/article/we-will-not-achieve-net-zero-carbon-emissions-if-the-pm-doesnt-take-responsibility-0082m2cdr';
    const secondImageURL = 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fde630c3a-743f-11ea-be30-097bd8237f0d.jpg?crop=3714%2C2089%2C0%2C193';
    const thirdURL = 'https://www.euronews.com/2020/09/07/how-the-eu-is-trying-to-make-one-hundred-cities-carbon-neutral-by-2030';
    const thirdImageURL = 'https://static.euronews.com/articles/library/11/14/39/37/40/45/11143916a374015ade718bdaebbd88e4554b83cf757f/640x360_cmsv2_c2b5b13a-71cc-5e1d-b7c3-afd10238de3b-11143916a374015ade718bdaebbd88e4554b83cf757f.jpg';

    return(
        <div>
            <span className='tagline'>
                Welcome to the change making.
            </span>
            <div
                className='homenews'
                onClick={() => window.open(firstURL)}
            >
                <img
                    src={firstImageURL}
                    alt='News'
                    className='newspicone'
                />
                <span className='newstitleone'>
                    Climate Assembly UK demands 'strong and clear' government leadership on net zero
                </span>
            </div>
            <div
                className='homenews'
                onClick={() => window.open(secondURL)}
            >
                <img
                    src={secondImageURL}
                    alt='News'
                    className='newspictwo'
                />
                <span className='newstitletwo'>
                    We will not achieve net-zero carbon emissions if the PM doesn't take responsibility
                </span>
            </div>
            <div
                className='homenews'
                onClick={() => window.open(thirdURL)}
            >
                <img
                    src={thirdImageURL}
                    alt='News'
                    className='newspicthree'
                />
                <span className='newstitlethree'>
                    How the EU is trying to make one hundred cities carbon neutral by 2030
                </span>
            </div>
        </div>
    )
}

export default Home;
