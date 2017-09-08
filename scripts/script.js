/*
*https://oauth.vk.com/blank.html#access_token=92774a99a39aa675a95e766b071785ad789bca0194a91266dc5c7b2084c8baf1f3674066baff91bcd6f56&expires_in=86400&user_id=180517993
*https://oauth.vk.com/authorize?client_id=6176315&display=page&redirect_uri=&scope=market&response_type=token&v=5.52
*?w=product-153061474_903315
*/
$('#load').on('click', loadProduct);

function getUrl(method, params){
  if(!method){
    throw new Error('Вы не указали метод');
  }
  params = params || {};
  params['access_token'] = '92774a99a39aa675a95e766b071785ad789bca0194a91266dc5c7b2084c8baf1f3674066baff91bcd6f56';
  return 'https://api.vk.com/method/' + method +'?' + $.param(params);
}
function sendRequest(method, params, func){
  $.ajax({
    url: getUrl(method , params),
    method: 'GET',
    dataType: 'JSONP',
    success: func
  });
}
function loadProduct(){
  sendRequest('market.search', {count: 30, owner_id: -153061474, extended: 'photos'}, function(data){
    console.log(data);
    drawProduct(data.response);
  })
}

function drawProduct(product){
  var html = '';

  for(var i = 1; i < product.length; i++){
    var f = product[i];
    html += 
    '<div class="item card">' + 
    '<img class="card-img-top" src="' + f.thumb_photo + '"/>' + 
      '<div class="card-body">' +
      '<a target="_blank" href="https://vk.com/club153061474?w=product' + f.owner_id + '_' + f.id + '">' + f.title + '</a>'
      +'<h6 class="card-title">' + f.category.name + '</h6>' +
      '<button class="btn btn-primary">Написать</button>' + 
      '</div>' + 
    '</div>';
  }
  $('.product-containet').html(html);
}