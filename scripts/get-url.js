(function(window){
  'use strict';
  var App = window.App || {};

  function GetUrl(method, params){
    if(!method){
      throw new Error('Вы не указали метод');
    }
    params = params || {};
    params['access_token'] = '5ebaf24e180ced5bec9db767f18f335f277b68031c188338e1de4480f88e69df348fd32b2194461231655';
    return 'https://api.vk.com/method/' + method +'?' + $.param(params);
  }

  App.GetUrl = GetUrl;
  window.App = App;
})(window);