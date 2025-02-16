import { BaseComponent } from "./BaseComponent";

export class FormComponent extends BaseComponent {
  constructor() {
    super();
  }
    connectedCallback() {
        super.connectedCallback(); 
        this.addEventListeners();
    }

    addEventListeners(){
        const calculateBtn = this.querySelector('#calculate-btn');
        calculateBtn.addEventListener('click', this.onClickCalculate.bind(this));
    }

    getTemplate() {
        return /*html*/ `
        <div class="container p-4">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label for="start-capital" class="form-label">Starting Amount</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="start-capital" aria-describedby="start-capital-addon">
                        <span class="input-group-text" id="start-capital-addon"><i class="bi bi-bank2"></i></span>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="increment" class="form-label">Monthly savings contribution</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="increment" aria-describedby="increment-addon">
                        <span class="input-group-text" id="increment-addon"><i class="bi bi-cash-coin"></i></span>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="period" class="form-label">Investment horizon in years</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="period" aria-describedby="period-addon">
                        <span class="input-group-text" id="period-addon"><i class="bi bi-hourglass-split"></i></span>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="rate" class="form-label">Rate of Return</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="rate" aria-describedby="rate-addon">
                        <span class="input-group-text" id="rate-addon"><i class="bi bi-percent"></i></span>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="annual-costs" class="form-label">Annual Costs</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="annual-costs" aria-describedby="annual-costs-addon">
                        <span class="input-group-text" id="annual-costs-addon"><i class="bi bi-percent"></i></span>
                    </div>
                </div>

                <div class="col-12 d-flex justify-content-md-start justify-content-center mt-3">
                    <button class="btn btn-primary" id="calculate-btn">CALCULATE</button>
                </div>
            </div>
        </div>    
        `;
    }

    onClickCalculate(){
        const values = this.getFormValues()
        const event = new CustomEvent('calculate', {
            detail: values,
            bubbles: true,
        });
        this.dispatchEvent(event);
    }

    getFormValues() {
        return {
            startCapital: this.querySelector('#start-capital').value,
            monthlyContribution: this.querySelector('#increment').value,
            investmentYears: this.querySelector('#period').value,
            rateOfReturn: this.querySelector('#rate').value,
            annualCosts: this.querySelector('#annual-costs').value
        };
    }
}
