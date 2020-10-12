class User {
    constructor() {
        this.purchasedCredits = 0;
        this.investedCapital = 0;
        this.investments = [];
    }

    getPurchasedCredits() {
        return this.purchasedCredits;
    }

    getInvestedCapital() {
        return this.investedCapital;
    }

    getInvestments() {
        return this.investments;
    }

    purchase(project, credits) {
        this.purchasedCredits += parseInt(credits);

        if(this.investments.filter(
            investment => investment.key === project.key
        ).length === 0) {

            project.purchasedCredits = parseInt(credits);
            this.investments.push(project);
            return;
        };

        project.purchasedCredits += parseInt(credits);
    }

    invest(amount) {
        this.investedCapital += parseInt(amount);
    }
}

const user = new User();

export default user;
