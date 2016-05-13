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
  var app = SimpleApp('lp-form', {
    localStorageRead: false
  });
  if (qs) app.state = qs;

  app.template.main = {
    default: '<form>' +
    '<h3>About your car</h3>' +
    '<div class="form-group">' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-car-front"></span></div>{make}</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-car-front"></span></div>{model}</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-paragraph"></span></div>{year}</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="icon-pin"></span></div>{location}</div>' +
    '<div class="input-group" style="padding: 10px;">{type}</div>' +
    '</div>' +
    '<h3>About yourself</h3>' +
    '<div class="form-group">' +
    '</div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="uhf-icon-person-man"></span></div>' +
    '<input class="form-control" type="text" placeholder="Your name"></div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="uhf-icon-person-man"></span></div>' +
    '<input class="form-control" type="phone" placeholder="Your phone number"></div>' +
    '<div class="input-group"> <div class="input-group-addon">' +
    '<span class="uhf-icon-person-man"></span></div>' +
    '<input class="form-control" type="email" placeholder="Your email address"></div>' +
    '<div class="form-group">{btn}</div>' +
    '</form>'
  };

  app.template.sub.type = {
    _type: 'div',
    _wrapper: ['<div>', '</div>'],
    default: '<label><input type="radio" {attr}> {value}</label>'
  };
  app.data.type = {
    wrapper: {},
    element: [
      {
        value: 'Quick service',
        style: 'margin-right: 5px;'
      },
      {
        value: 'Logbook service',
        style: 'margin-right: 5px; margin-left:5px'
      }
    ]
  };

  app.template.sub.location = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option {attr}>{_label}</option>'
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
    var pc = {
      value: item,
      _label: item
    };
    if (qs.location == item) {
      pc.selected = 'selected';
    }
    app.data.location.element.push(pc)
  });

  app.template.sub.make = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option {attr}>{_label}</option>'
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
    var pc = {
      value: item,
      _label: item
    };
    if (item == qs.make) {
      pc.selected = 'selected';
    }
    app.data.make.element.push(pc);
  });

  app.template.sub.year = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option {attr}>{_label}</option>'
  };
  app.data.year = {
    wrapper: {
      class: "form-control"
    },
    element: [{
      value: '',
      _label: 'Year of your car'
    }]
  };

  app.template.sub.model = {
    _type: 'select',
    _wrapper: ['<select {attr}>', '</select>'],
    default: '<option {attr}>{_label}</option>'
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
  if (qs.model && qs.make && qs.location) {
    if (typeof window.mmyv[qs.make] === 'object') {
      Object.keys(window.mmyv[qs.make]).map(function (item) {
        var pc = {
          value: item,
          _label: item
        };
        if (item == qs.model) {
          pc.selected = 'selected';
        }
        app.data.model.element.push(pc);
      });
      // get year
      if (window.mmyv[qs.make][qs.model]) {
        Object.keys(window.mmyv[qs.make][qs.model]).map(function (item) {
          var pc = {
            value: item,
            _label: item
          };
          app.data.year.element.push(pc);
        });
      }
    }
  }

  app.template.sub.btn = {
    _type: 'button',
    default: '<button {attr}>{_label}</option>'
  };
  app.data.btn = {
    class: 'form-control btn btn-primary',
    style: 'height:auto;',
    _label: 'Find service details',
    type: 'button'
  };

  app.init(document.getElementById('lp_form'));

  app.on(SimpleAppStateIsUpdated, 'make', function (obj) {
    console.clear();
    var mk = obj.value;
    if (typeof window.mmyv[mk] === 'object') {
      app.data.model.element = [{
        value: '',
        _label: 'Model of your car'
      }];
      Object.keys(window.mmyv[mk]).map(function (item) {
        var pc = {
          value: item,
          _label: item
        };
        app.data.model.element.push(pc);
      });
      app.render();
    }
  });
  app.on(SimpleAppStateIsUpdated, 'model', function (obj) {
    console.clear();
    if (typeof window.mmyv[obj.state.make][obj.state.model] === 'object') {
      app.data.year.element = [{
        value: '',
        _label: 'Year of your car'
      }];
      Object.keys(window.mmyv[obj.state.make][obj.state.model]).map(function (item) {
        var pc = {
          value: item,
          _label: item
        };
        app.data.year.element.push(pc);
      });
      app.render();
    }
  });

  app.on(SimpleAppStateIsUpdated, 'year', function (obj) {
    console.clear();
    if (typeof window.mmyv[obj.state.make][obj.state.model] === 'object') {
      app.data.year.element = [{
        value: '',
        _label: 'Year of your car'
      }];
      Object.keys(window.mmyv[obj.state.make][obj.state.model]).map(function (item) {
        var pc = {
          value: item,
          _label: item
        };
        app.data.year.element.push(pc);
      });
      app.render();
    }
  });

  app.on(SimpleAppStateIsUpdated, 'btn', function (obj) {
    if (obj.state.location && obj.state.make && obj.state.model &&
      obj.state.location.length > 1 && obj.state.make.length > 1 &&
      obj.state.model.length > 1) {
      window.location.href = '/result-complete?' + app.toQuerystring();
    } else {
      alert('Please tell us about your car');
      console.clear();
      console.log(obj.state);
      return false;
    }
  });

})();