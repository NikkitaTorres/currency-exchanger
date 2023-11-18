//BUSINESS/SERVICE LOGIC
export default class ExchangeService {  
  static getCurrency(placeHolder) {
    return fetch(`https://v6.exchangerate-api.com/v6/26f85f40cf2d0be6f6a54166/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })      
      .catch(function(error) {
        return error;
      });
  }
}