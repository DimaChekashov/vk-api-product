(function(){
  'use strict';
  var App = window.App || {};

  function SearchProduct(){

  };

  SearchProduct.prototype.searchProductAll = function(){
    App.SendRequest('market.search', {count: 30, owner_id: -153061474, extended: 'photos'}, function(data){
      console.log(data);
       search.drawProduct(data.response);
    });
  }

  SearchProduct.prototype.drawProduct = function(product){
    var html = '';

    for(var i = 1; i < product.length; i++){
      var f = product[i];
      html += 
      '<div class="item card">' + 
      '<img class="card-img-top" src="' + f.thumb_photo + '"/>' + 
        '<div class="card-body">' +
        '<a target="_blank" href="https://vk.com/club153061474?w=product' + f.owner_id + '_' + f.id + '">' + f.title + '</a>'
        +'<h6 class="card-title">' + f.category.name + '</h6>' +
        '<button class="btn btn-danger" onclick="App.DeleteProduct(' + f.id + ')">Удалить</button>' +
        '<button class="btn btn-success" onclick="App.RestoreProduct(' + f.id + ')">Восстановить</button>' +
        '</div>' + 
      '</div>';
    }
    $('.product-containet').html(html);
  }


  App.SearchProduct = SearchProduct;
  window.App = App;
})(window);