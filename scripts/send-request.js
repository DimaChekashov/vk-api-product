(function(window){
  'use strict';
  var App = window.App || {};

  function SendRequest(method, params, func){
    $.ajax({
      url: App.GetUrl(method , params),
      method: 'GET',
      dataType: 'JSONP',
      success: func
    });
  };

  App.SendRequest = SendRequest;
  window.App = App;
})(window)