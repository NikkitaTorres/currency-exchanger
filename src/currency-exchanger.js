export default class ExchangeService {  
  static getCurrency(currency, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}/${amount}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        throw new Error(`Request failed: ${error.message}`);
      });
  }
}