(function(window){
  'use strict';
  var App = window.App || {};

  function DeleteProduct(id){
    App.SendRequest('market.delete', {owner_id: -153061474, item_id: id}, function(data){
      console.log('Товар удален id: ' + id);
      console.log(data);
    });
  }

  App.DeleteProduct = DeleteProduct;
  window.App = App;
})(window);