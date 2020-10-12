import data from '../model/projects.json'

class ProjectsController {
    constructor() {
        this.data = data;
    }

    getProject(key) {
        return this.data.projects[key - 1];
    }

    spendCredits(key, amount) {
        this.data.projects[key - 1].availableAmount -= amount;
    }

    getSDGPaths(impact) {
        return impact.map(sDG => '/resources/' + sDG + '.png');
    }

    calculateAverageMarketPrice() {

        let denominator = this.data.projects
            .map(project => project.availableAmount)
            .reduce((acc, value) => acc + value);

        let numerator = this.data.projects
            .map(project => project.price * project.availableAmount)
            .reduce((acc, value) => acc + value);

        let average = numerator / denominator;

        return average;
    }
}

const projectsController = new ProjectsController();

export default projectsController;
