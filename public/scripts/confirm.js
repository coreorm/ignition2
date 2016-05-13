(function () {
  Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
      j = Math.floor(Math.random() * ( i + 1 ));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  };

  // get querystring
  var qs = {}, hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    qs[hash[0]] = decodeURIComponent(hash[1]);
  }

  var dealer = window.sfDealers[0];
  window.sfDealers.map(function (item) {
    if (item._id == qs.id) {
      dealer = item;
    }
  });
  dealer._banner = dealer._img.replace('logo', 'banner');

  // opts
  var app = SimpleApp('lp-confirm', {
    localStorageRead: false
  });

  app.template.main.default = '<div class="hmcPage serviceFinder--page">' +
    '<div class="container hmcPage--container serviceFinder--container">{dealer}' +
    '<div class="container">{btn}{btn2}</div></div>{blobs}' +
    '<div class="container">{btn}{btn2}</div></div>';

  app.template.sub.dealer = {
    default: '<div {attr}>' +
    '<img class="serviceFinder--logo" src="/images/{_banner}">' +
    '<h1>{_hdr}</h1>' +
    '<p>{_cnt}</p></div>'
  };
  app.data.dealer = dealer;

  app.template.sub.blobs = {
    _wrapper: ['<div>', '</div>'],
    default: '<div class="container">{_hdr}<div class="serviceFinder--box">' +
    '<img src="/images/{_img}" class="serviceFinder--text"></div>' +
    '</div>'
  };
  app.data.blobs = {
    wrapper: {},
    element: [
      {
        _hdr: '<h3>Services available for the next 7 days</h3>',
        _img: 'calendar-map.png'
      },
      {
        _hdr: '<h3>What our customers say about us</h3>',
        _img: 'customer-reviews-2-reviews.png'
      }
    ]
  };

  app.template.sub.btn = {
    _type: 'button',
    default: '<button {attr}>{_cap}</button>'
  };
  app.data.btn = {
    _cap: 'Make a booking',
    class: 'btn btn-primary',
    type: 'button'
  };

  app.template.sub.btn2 = {
    _type: 'button',
    default: ' <button {attr}>{_cap}</button>'
  };
  app.data.btn2 = {
    _cap: 'Contact the dealer',
    class: 'btn btn-secondary',
    type: 'button',
    style: 'margin-left:20px;'
  };

  app.init(document.getElementById('container'));

})();