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

  // opts
  var app = SimpleApp('lp-results-all', {
    localStorageRead: false
  });
  if (qs) app.state = qs;

  app.template.main.default = '<div class="hmcPage serviceFinder--page">' +
    '<div class="container hmcPage--container serviceFinder--container">' +
    '<div class="container">{_hdr}{car}{dealer}</div>' +
    '<hr style="border-bottom:1px solid #ccc;"/>' +
    '<div class="container"><h3>Authorised <strong>' + qs.make +
    ' ' + qs.model + '</strong> Service Centers in ' + qs.location +
    ' area</h3>' +
    '<div class="serviceFinder--box">{table}</div></div>' +
    '</div>';

  app.template.sub.dealer = {
    default: '<div {attr}>' +
    '<div style="width:150px;padding: 10px;height:150px;border-radius:100px;background:#fff;' +
    'float: right;text-align: center;">' +
    '<div style="font-size: 60px;">10</div> ' +
    '<p>service providers</p></div><h1>{_hdr}</h1>' +
    '<p>{_cnt}</p></div>'
  };
  app.data.dealer = {
    _hdr: '<h1>' + qs.type + '</h1>',
    class: 'col-sm-12',
    _cnt: 'Highest price: $260 <br>Average price: $220 <br>Lowest price: $190 <br>'
  };

  app.template.sub.car = {
    default: '<div {attr}><img style="float:left;" src="{_img}"><p>{_desc}</p></div>'
  };
  app.data.car = {
    class: 'col-sm-8',
    style: 'padding:20px;background:#fff;margin:20px 10px;',
    _img: 'http://sit-1.resources.s3.cp1.carsguide.com.au/icon_model_'
    + qs.make.toLowerCase() + '_'
    + qs.model.toLowerCase() + '.png',
    _desc: '<ul><li>' + qs.make + '</li><li>' + qs.model +
    '</li><li>' + qs.year + '</li></ul>'
  };

  // tables
  app.template.sub.table = {
    _wrapper: ['<table class="table table-hover table-striped" {attr}>' +
    '<thead class="thead-inverse"><tr><th>' +
    '</th><th>13th</th><th>14th</th><th>15th</th>' +
    '<th>16th</th><th>17th</th><th>18th</th><th>17th</th><th></th></tr></thead><tbody>', '</tbody></table>'],
    default: '<tr><td><img width="100px" class="img-thumbnail" src="/images/{_img}"></td>' +
    '<td>{monday}</td>' +
    '<td>{tuesday}</td>' +
    '<td>{wednesday}</td>' +
    '<td>{thursday}</td>' +
    '<td>{friday}</td>' +
    '<td>{saturday}</td>' +
    '<td>{sunday}</td>' +
    '<td><button class="btn btn-serviceFinder" type="button" ' +
    'onclick="SimpleApp(\'lp-results-all\').updateState(\'detail\', {_id})">' +
    'book now</button></td>' +
    '</tr>'
  };
  app.data.table = {
    element: window.sfDealers
  };

  app.init(document.getElementById('container'));

  app.on(SimpleAppStateIsUpdated, 'detail', function (obj) {
    // we use the given state to do the job
    console.clear();
    console.log('details button', obj);
    document.location.href = '/confirm?id=' + obj.value;
  });

})();