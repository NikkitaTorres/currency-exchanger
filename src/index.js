import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './currency-exchanger.js'

function updateResults(result, isError = false) {
  const resultsDiv = document.querySelector('.results');
  resultsDiv.innerHTML = isError ? `<p class="error">${result}</p>` : `<p>Converted Amount: ${result}</p>`;
}

// Event listener for form submission
document.getElementById('usd').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get user input
  const usdAmount = document.getElementById('usd-amount').value;
  const selectedCurrency = document.getElementById('currencyList').value;

  // Call the ExchangeService to get the converted amount
  ExchangeService.getCurrency(selectedCurrency, usdAmount)
    .then(response => {
      if (response.result === 'error') {
        updateResults(response['error-type'], true);
      } else if (response.conversion_rate === undefined) {
        updateResults('Selected currency not found.', true);
      } else {
        const convertedAmount = (usdAmount * response.conversion_rate).toFixed(2);
        updateResults(convertedAmount);
      }
    })
    .catch(error => {
      console.error('An error occurred while processing your request:', error);
      updateResults('An error occurred while processing your request.', true);
    });
});