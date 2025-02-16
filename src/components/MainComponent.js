export class MainComponent extends HTMLElement{

    constructor() {
        super();
        this.values = []
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

    handleCalculate(formValues){
        
        this.values = []
        const currentYear = new Date().getFullYear()
        let t = Number(formValues.investmentYears)
        let M = Number(formValues.startCapital)
        let i = Number(formValues.rateOfReturn) / 100 + 1
        let I = Number(formValues.monthlyContribution)
        let c = M;
        
        for(let j=0; j<t; j++){
            c = (c*i)+I
            this.values.push({
                year: currentYear+j+1,
                baseCapital: M,
                endCapitals: c.toFixed(2),
                contribution: I,
                gainFromStart: j == 0 ? 
                (c-M-I).toFixed(2) 
                : 
                (c-M-(I*(j+1))).toFixed(2)
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
            <form-component ></form-component>
            <graph-component data='${JSON.stringify(this.values)}'></graph-component>
        `;
    }



}