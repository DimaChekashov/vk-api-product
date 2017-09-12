(function(window){
  'use strict';
  var App = window.App || {};

  function RestoreProduct(id){
    App.SendRequest('market.restore', {owner_id: -153061474, item_id: id}, function(data){
      console.log('Товар восстановлен id: ' + id);
      console.log(data);
    });
  }

  App.RestoreProduct = RestoreProduct;
  window.App = App;
})(window);