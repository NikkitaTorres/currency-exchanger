import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './currency-exchanger.js';

function updateResults(result, isError = false) {
  const resultsContainer = document.getElementById('results-container');
  const resultsDiv = document.getElementById('results');

  resultsContainer.classList.remove('hidden');

  resultsDiv.innerHTML = isError ? `<p class="error">${result}</p>` : `<p>Converted Amount: ${result}</p>`;
}

document.getElementById('usd-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const usdAmount = document.getElementById('usd-amount').value;
  const selectedCurrency = document.getElementById('currencyList').value;

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
      updateResults(`An error occurred: ${error.message}`, true);
    });
});