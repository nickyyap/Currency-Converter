async function convertCurrency() {
  const amountInput = document.getElementById('amount').value.trim();
  const amount = parseFloat(amountInput);
  const fromCurrency = document.getElementById('currencyFrom').value;
  const toCurrency = document.getElementById('currencyTo').value;

  if (
    isNaN(amount) ||
    amount <= 0 ||
    fromCurrency === 'Choose...' ||
    toCurrency === 'Choose...'
  ) {
    document.getElementById(
      'convertedAmount'
    ).innerHTML = `<h5 class="text-center text-danger">Please enter valid input value</h5>`;
    return;
  }

  console.log('Amount: ', amount);
  console.log('From Currency: ', fromCurrency);
  console.log('To Currency: ', toCurrency);

  try {
    const response = await fetch(
      'https://api.currencyapi.com/v3/latest?apikey=cur_live_K8uFzO3UBsMZ3DMmANemOSZhkbW9gfmljxrCJidS'
    );
    const data = await response.json();

    const fromRate = data.data[fromCurrency].value;
    const toRate = data.data[toCurrency].value;

    const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);

    document.getElementById(
      'convertedAmount'
    ).innerHTML = `<h5 class="text-center">${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</h5>`;
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('There was a problem with the fetch operation.');
  }
}

function reset() {
  document.getElementById('amount').value = '';
  document.getElementById('currencyFrom').value = 'Choose...';
  document.getElementById('currencyTo').value = 'Choose...';
  document.getElementById('convertedAmount').innerHTML = '';
}
