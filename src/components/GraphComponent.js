import { BaseComponent } from "./BaseComponent";

export class GraphComponent extends BaseComponent {
  static observedAttributes = ["data"];
  charts = [];
  startingAmountColor = "#487ffe";
  contributionColor = "#ff6384";
  gainColor = "#ffce56";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && newValue) {
      try {
        this.data = JSON.parse(newValue);
        this.lastData = this.data.slice(-1)[0];
        if (this.lastData) {
          this.baseCapital = Number(this.lastData.baseCapital).toFixed(2);
          this.totalContributions = (
            Number(this.lastData.endCapitals) -
            Number(this.baseCapital) -
            Number(this.lastData.gainFromStart)
          ).toFixed(2);

          this.totInvestedCap = (
            Number(this.lastData.baseCapital) + Number(this.totalContributions)
          ).toFixed(2);

          this.totGain = Number(this.lastData.gainFromStart).toFixed(2);
          this.totalEndCap = Number(this.lastData.endCapitals).toFixed(2);
          this.createInfoBox();
        }

        setTimeout(() => this.updateCharts(), 0);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }

  getTemplate() {
    return /*html*/ `
        <section class="text-primary">
        <h3 class="p-4">Results</h3>
            <div class="row ">
                <div class=" col-12 col-md-7 mb-sm-4">
                    <canvas id="timeChart"></canvas>
                </div>
                <div class="col-12 col-md-5">
                    
                    <canvas id="pieChart"></canvas>  
                </div>
                <div id="info-box"></div>
            </div>
        </section>
        `;
  }

  updateCharts() {
    const timeChart = this.querySelector("#timeChart");
    const pieChart = this.querySelector("#pieChart");
    if (this.charts.length > 0) {
      this.charts.forEach((chart) => chart.destroy());
    }

    this.createBarChart(timeChart);
    this.createPieChart(pieChart);
  }

  createInfoBox() {
    const infoBox = this.querySelector("#info-box");
    if (infoBox) {
        infoBox.innerHTML = /*html*/ `
        <ul class="list-group list-group-flush d-flex flex-column gap-2 p-4">
          <li class="list-group-item row d-flex flex-row justify-content-between ">
              <div class="col-6 text-start">Starting capital:</div>  
              <div class="col-6 text-center">${this.baseCapital}</div>
          </li>
          <li class="list-group-item row d-flex flex-row justify-content-between ">
              <div class="col-6 text-start">Contributions:</div>  
              <div class="col-6 text-center">${this.totalContributions}</div>
          </li>
          <li class="list-group-item row d-flex flex-row justify-content-between ">
              <div class="col-6 text-start">Total gain:</div>  
              <div class="col-6 text-center">${this.totGain}</div>
          </li>
          <li class="list-group-item row d-flex flex-row justify-content-between ">
              <div class="col-6 text-start">Total invested capital:</div>  
              <div class="col-6 text-center">${this.totInvestedCap}</div>
          </li>
          <li class="list-group-item row d-flex flex-row justify-content-between ">
              <div class="col-6 text-start">End of period capital:</div>  
              <div class="col-6 text-center">${this.totalEndCap}</div>
          </li>
      </ul>

        `;
    }
}


  createPieChart(ctx) {
    this.charts.push(
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Starting Capital", "Contribution", "Tot Gain"],
          datasets: [
            {
              label: "Value",
              data: [this.baseCapital, this.totalContributions, this.totGain],
              backgroundColor: [
                this.startingAmountColor,
                this.contributionColor,
                this.gainColor,
              ],
            },
          ],
        },
        options: {
          responsive: true,
        }
      })
    );
  }

  createBarChart(ctx) {
    this.charts.push(
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.data.map((e) => e.year),
          datasets: [
            {
              label: "Starting Amount",
              data: this.data.map((e) => e.baseCapital),
              borderWidth: 1,
              backgroundColor: this.startingAmountColor,
              stack: "stack1",
            },
            {
              label: "Contributions",
              data: this.data.map(
                (e) => e.endCapitals - e.baseCapital - e.gainFromStart
              ),
              borderWidth: 1,
              backgroundColor: this.contributionColor,
              stack: "stack1",
            },
            {
              label: "Total interest",
              data: this.data.map((e) => e.gainFromStart),
              borderWidth: 1,
              backgroundColor: this.gainColor,
              stack: "stack1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              beginAtZero: true,
              stacked: true,
            },
          },
        },
      })
    );
  }
}
