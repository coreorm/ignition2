(function () {
  // opts
  var app = SimpleApp('lp-form', {
    localStorageRead: false
  });

  app.template.main = {
    default: '<form><div class="form-group">' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-car-front"></span></div>{make}</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-car-front"></span></div>{model}</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-pin"></span></div>{location}</div>' +
    '</div>' +
    '<div class="form-group">{btn}</div>' +
    '</form>'
  };

  app.template.sub.location = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option value="{value}">{_label}</option>'
  };

  app.data.location = {
    wrapper: {
      class: "form-control"
    },
    element: [{
      value: '',
      _label: 'Preferred Location'
    }]
  };
  var locs = ["ACT - All", "NSW - All", "NSW - Central Coast", "NSW - Central West", "NSW - Far North Coast", "NSW - Far West", "NSW - Hunter", "NSW - Illawarra", "NSW - Mid North Coast", "NSW - New England", "NSW - Newcastle", "NSW - Riverina", "NSW - South Coast", "NSW - Sydney", "NT - All", "NT - North", "NT - South", "QLD - All", "QLD - Brisbane", "QLD - Central Coast", "QLD - Central West", "QLD - Far North", "QLD - Gold Coast", "QLD - South West", "QLD - Sunshine Coast", "SA - Adelaide", "SA - All", "SA - Barossa Valley", "SA - Eyre Peninsula", "SA - Murray", "SA - North", "SA - South", "SA - South East", "SA - York Peninsula", "TAS - All", "TAS - North", "TAS - South", "VIC - All", "VIC - Central Victoria", "VIC - Gippsland", "VIC - Melbourne", "VIC - Northern", "VIC - South Western", "VIC - Wimmera Mallee", "WA - All", "WA - Country East", "WA - North Coast", "WA - Perth", "WA - Pilbara Kimberley", "WA - South West Coast"];
  locs.map(function (item) {
    app.data.location.element.push({
      value: item,
      _label: item
    })
  });

  app.template.sub.make = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option value="{value}">{_label}</option>'
  };
  app.data.make = {
    wrapper: {
      class: "form-control",
    },
    element: [{
      value: '',
      _label: 'Make of your car'
    }]
  };
  Object.keys(window.mmyv).sort().map(function (item) {
    app.data.make.element.push({
      value: item,
      _label: item
    })
  });

  app.template.sub.model = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option value="{value}">{_label}</option>'
  };
  app.data.model = {
    wrapper: {
      class: "form-control"
    },
    element: [{
      value: '',
      _label: 'Model of your car'
    }]
  };

  app.template.sub.btn = {
    _type: 'button',
    default: '<button {attr}>{_label}</option>'
  };
  app.data.btn = {
    class: 'form-control btn btn-primary',
    style: 'height:auto;',
    _label: 'LET\'S DO IT!',
    type: 'button'
  };

  app.init(document.getElementById('lp_form'));
  app.render();

  app.on(SimpleAppStateIsUpdated, 'make', function (obj) {
    console.clear();
    var mk = obj.value;
    if (typeof window.mmyv[mk] === 'object') {
      app.data.model.element = [{
        value: '',
        _label: 'Model of your car'
      }];
      Object.keys(window.mmyv[mk]).map(function (item) {
        app.data.model.element.push({
          value: item,
          _label: item
        });
      });
      app.render();
    }
  });

  app.on(SimpleAppStateIsUpdated, 'btn', function (obj) {
    if (obj.state.location && obj.state.make && obj.state.model &&
      obj.state.location.length > 1 && obj.state.make.length > 1 &&
      obj.state.model.length > 1) {
      var result = SimpleApp('lp-result-simple');
      result.data.jumbo._mm = obj.state.make + ' ' + obj.state.model;
      result.render(true);
    } else {
      alert('Please tell us about your car');
      console.clear();
      console.log(obj.state);
      return false;
    }
  });

})();