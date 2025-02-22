export class MainComponent extends HTMLElement {
    constructor() {
        super();
        
        this.values = this.getDefaultValues()
    }
    
    connectedCallback() {
        this.render();
        this.addEventListeners()
    }
    
    addEventListeners(){
        this.addEventListener('calculate', e => {
            this.handleCalculate(e.detail)
        })
    }
    
    getDefaultValues() {
        const currentYear = new Date().getFullYear()
        return [{
            year: currentYear + 1,
            baseCapital: 10000,
            endCapitals: 11000,
            contribution: 5000,
            gainFromStart: 800
        }]
    }

    handleCalculate(formValues){
        this.values = []
        const currentYear = new Date().getFullYear()
        let t = Number(formValues.investmentYears)
        let M = Number(formValues.startCapital)
        let r = Number(formValues.rateOfReturn) / 100 
        let I = Number(formValues.monthlyContribution) * 12
        let c = M;
        
        for(let j = 0; j < t; j++) {

            c = c * (1 + r) + I * ((Math.pow(1 + r, 1) - 1) / r)
            
            this.values.push({
                year: currentYear + j + 1,
                baseCapital: M,
                endCapitals: c.toFixed(2),
                contribution: I,
                gainFromStart: j == 0 ?
                    (c - M - I).toFixed(2) :
                    (c - M - (I * (j + 1))).toFixed(2)
            })
        }
        this.reloadCharts()
    }
    
    reloadCharts(){
        const graphComponent = this.querySelector('graph-component');
        
        if (graphComponent) {
            graphComponent.setAttribute('data', JSON.stringify(this.values));
        }
    }
    
    render() {
        this.innerHTML = /*html*/`
            <form-component></form-component>
            <graph-component data='${JSON.stringify(this.values)}'></graph-component>
        `;
    }
}