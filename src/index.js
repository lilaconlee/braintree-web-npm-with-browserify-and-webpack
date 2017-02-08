var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');
var authorization = 'sandbox_g42y39zw_348pk9cgf3bgyw2b'; // put in your own client token or tokenization key
var btn = document.querySelector('#btn');

client.create({
  authorization: authorization
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
    return;
  }

  hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '1em',
        'font-family': "'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif"
      },
      'input.invalid': {
        'color': 'red'
      },
      'input.valid': {
        'color': 'green'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10/2019'
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
      return;
    }

    btn.addEventListener('click', function () {
      btn.disabled = true;

      hostedFieldsInstance.tokenize(function (err, payload) {
        btn.removeAttribute('disabled');
        if (err) {
          alert('Somethign went wrong');
          return;
        }
        alert('Send nonce to server: ' + payload.nonce);
      });
    });
    btn.removeAttribute('disabled');
  });
});
