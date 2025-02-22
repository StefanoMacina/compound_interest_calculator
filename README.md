# 📈 Compound Interest Calculator

## 🌍 Overview
The **Compound Interest Calculator** is a tool that computes the future value of an investment or loan based on the initial principal, interest rate, compounding frequency, and time. It helps estimate how interest accumulates over time, considering interest earned on both the principal and previously accrued interest.

🔗 **Try it here:** [Compound Interest Calculator](https://www.stefanomacinaleone.it/compound-interest-calculator/)

## ✨ Features
- 📊 Calculates compound interest based on user-defined parameters.
- 🔄 Supports different compounding frequencies (daily, monthly, annually, etc.).
- 📈 Provides clear and accurate financial projections.
- ⚡ Easy-to-use interface for quick calculations.

## 🛠 Usage
1. 🏦 Enter the initial principal amount.
2. 📉 Input the annual interest rate.
3. ⏳ Specify the number of years.
4. 💰 Enter the monthly contribution amount.
5. ✅ Get the future value and total interest earned.

## 📐 Formula Used
The compound interest is calculated using the following approach:

```
let t = Number(formValues.investmentYears)
let M = Number(formValues.startCapital)
let r = Number(formValues.rateOfReturn) / 100 
let I = Number(formValues.monthlyContribution) * 12
let c = M;

for(let j = 0; j < t; j++) {
    c = c * (1 + r) + I * ((Math.pow(1 + r, 1) - 1) / r)
}
```

Where:
- *c* = Future value of the investment/loan
- *M* = Initial principal amount
- *r* = Annual interest rate (in decimal form)
- *I* = Total annual contributions
- *t* = Number of years

The yearly values are recorded, showing the base capital, contributions, and gains over time.

## 🏗 Installation
1. 📥 Clone the repository:
   ```sh
   git clone https://github.com/StefanoMacina/compound_interest_calculator.git
   ```
2. 📂 Navigate to the project directory:
   ```sh
   cd compound-interest-calculator
   ```
3. ⚙️ Install dependencies (if applicable).
    ```sh
    npm install
    ```

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Feel free to contribute by submitting issues or pull requests.

---


