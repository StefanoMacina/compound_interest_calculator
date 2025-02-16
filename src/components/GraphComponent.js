import { BaseComponent } from "./BaseComponent";

export class  GraphComponent extends BaseComponent{
    static observedAttributes = ['data']
    charts = [];

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data' && newValue) {
            try {
                this.data = JSON.parse(newValue);
                setTimeout(() => this.updateCharts(), 0);
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        }
    }
    
    getTemplate(){
        return /*html*/`
        <section class="container">
            <div class="row ">
                <div class="col-7">
                    <canvas id="timeChart"></canvas>
                </div>
                <div class="col-5">
                    <ul>
                        <li>Total invested capital: </li>
                        <li>Total gain</li>
                    </ul>
                    <canvas id="pieChart"></canvas>  
                </div>
            </div>
        </section>
        `;
    }

    updateCharts(){
        const ctx = this.querySelector('#timeChart');
        if (this.charts.length > 0) {
            this.charts.forEach(chart => chart.destroy());
        }
        this.charts.push(new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.map(e => e.year),
                datasets: [
                    {
                        label: 'Starting Amount',
                        data: this.data.map(e => e.baseCapital),
                        borderWidth: 1,
                        backgroundColor: 'rgba(44, 99, 150, 0.5)',
                        stack: 'stack1'
                    },
                    {
                        label: 'Contributions',
                        data: this.data.map(e => e.endCapitals - e.baseCapital - e.gainFromStart),
                        borderWidth: 1,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        stack: 'stack1'
                    },
                    {
                        label: 'Total interest',
                        data: this.data.map(e => e.gainFromStart),
                        borderWidth: 1,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        stack: 'stack1'
                    },
                ]
              },
              options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true
                    }
                  }
              }
        }))
    }


}
