var dropin = require('braintree-web-drop-in');
var authorization = 'sandbox_g42y39zw_348pk9cgf3bgyw2b'; // put in your own client token or tokenization key
var btn = document.querySelector('#btn');

dropin.create({
  authorization: authorization,
  container: '#drop-in-container',
  paypal: {
    flow: 'checkout',
    currency: 'USD',
    amount: '0.01'
  }
}, function (err, dropInstance) {
  if (err) {
    console.log(err);
    return;
  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();

    dropInstance.requestPaymentMethod(function (err, payload) {
      console.log('payment method requested');
      console.log(err, payload);
    });
  });
});
