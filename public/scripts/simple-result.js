(function () {
  // opts
  var app = SimpleApp('lp-result-simple', {
    localStorageRead: false
  });

  app.template.main = {
    default: '<div class="serviceFinder--results">{hdr}{jumbo}{results}</div>'
  };

  app.template.sub.hdr = {
    default: '<h3 {attr}>{_label}</h3>'
  };

  app.data.hdr = {
    value: '',
    class: 'hmcPage--sectionHeading',
    _label: 'Services Near You'
  };

  app.template.sub.jumbo = {
    default: '<div {attr}><p>Add more details to get ' +
    'prices for either a quick service or a logbook service for your ' +
    '<em>{_mm}</em></p>{_btn}</div>'
  };
  app.data.jumbo = {
    class: 'hmcPage--sectionContent jumbotron serviceFinder--jumbotron',
    _mm: '',
    _btn: '<button type="button" ' +
    'onclick="SimpleApp(\'lp-result-simple\').updateState(\'submit\', true)" ' +
    'class="form-control btn btn-secondary">' +
    'Continue for pricing</button>'
  };

  app.template.sub.results = {
    _wrapper: ['<div class="serviceFinder--resultSimple" {attr}>', '</div>'],
    default: '<div class="serviceFinder--resultItem">' +
    '<label><img src="/images/{_img}"></label>' +
    '<div><h3>{_hdr}</h3><p>{_cnt}</p><button type="button" ' +
    'class="btn btn-serviceFinder" ' +
    'onclick="SimpleApp(\'lp-result-simple\').updateState(\'detail\', {_id})">' +
    'Get Price</button></div></div>'
  };
  app.data.results = {
    wrapper: {},
    element: []
  };

  app.init(document.getElementById('lp_result'), false);

  app.on(SimpleAppStateIsUpdated, 'submit', function (obj) {
    // we use the given state to do the job
    var inputData = SimpleApp('lp-form').state;
    document.location.href = '/more-details?make=' + inputData.make
      + '&model=' + inputData.model
      + '&location=' + inputData.location;
  });

  app.on(SimpleAppStateIsUpdated, 'detail', function (obj) {
    // we use the given state to do the job
    console.clear();
    console.log('details button', obj);
    document.location.href = '/confirm?id=' + obj.value;
  });

})();