import user from '../model/user';

class UserController {
    constructor() {
        this.user = user;
    }

    getPurchasedCredits() {
        return this.user.getPurchasedCredits();
    }

    getInvestedCapital() {
        return this.user.getInvestedCapital();
    }

    getInvestments() {
        return this.user.getInvestments();
    }

    registerPurchase(project, purchasedCredits, investedCapital) {

        this.user.purchase(project, purchasedCredits);
        this.user.invest(investedCapital);
    }

    calculatePercent() {
        let purchasedCredits = this.getPurchasedCredits();
        
        return (purchasedCredits / 50000) * 100;
    }

    calculateAverageCreditPrice() {

        let denominator = this.getInvestments()
            .map(project => project.purchasedCredits)
            .reduce(((acc, value) => acc + value), 0);

        let numerator = this.getInvestments()
            .map(project => project.price * project.purchasedCredits)
            .reduce(((acc, value) => acc + value), 0);

        let average = numerator / denominator;

        return average;
    }
}

const userController = new UserController();

export default userController;
