(function(window) {
  'use strict';
  var App = window.App;
  var delete_product = App.DeleteProduct;
  var restore_product = App.RestoreProduct;
  var create_product = App.CreateProduct;
  var search_product = App.SearchProduct;
  var send_request = App.SendRequest;
  var get_url = App.GetUrl;
  var search = new search_product();
  var create = new create_product();
  window.search = search;
  window.create = create;
  
  
  document.getElementById('load').addEventListener('click', function(){
    search.searchProductAll()
  });

})(window);