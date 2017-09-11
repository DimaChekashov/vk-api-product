/*
*https://oauth.vk.com/blank.html#access_token=2ee038dce5b67a53c88017d2f449fad9ca41e0cd8ea525886e294052593302729598c214e9bb50e15118a&expires_in=86400&user_id=180517993
*https://oauth.vk.com/authorize?client_id=6176315&display=page&redirect_uri=&scope=market,photos&response_type=token&v=5.52
*
*/
$('#load').on('click', loadProduct);

function getUrl(method, params){
  if(!method){
    throw new Error('Вы не указали метод');
  }
  params = params || {};
  params['access_token'] = '2ee038dce5b67a53c88017d2f449fad9ca41e0cd8ea525886e294052593302729598c214e9bb50e15118a';
  return 'https://api.vk.com/method/' + method +'?' + $.param(params);
}
function sendRequest(method, params, func){
  $.ajax({
    url: getUrl(method , params),
    method: 'GET',
    dataType: 'JSONP',
    success: func
  });
};

function loadProduct(){
  sendRequest('market.search', {count: 30, owner_id: -153061474, extended: 'photos'}, function(data){
    console.log(data);
    drawProduct(data.response);
  })
};

function createProduct(){
  sendRequest('market.add', {owner_id: -153061474, name: 'test-name', description: 'test-desccription', category_id: 2, price: 1000, main_photo_id: 456239022}, function(data){
    console.log(data);

  });
};

function getPhotoProduct(){
  sendRequest('photos.getMarketUploadServer', {group_id: 153061474, main_photo: 1, crop_x: 400, crop_y: 400}, function(data){
    console.log(data.response.upload_url);
    return data.response.upload_url;
  });
};


function sendPhotoInServer(){
  $.ajax({
    url: 'https://pu.vk.com/c841135/upload.php?act=do_add&mid=180517993&aid=-53&gid=153061474&hash=37f9508a36071f56dca3cf5b25a099d7&rhash=fe1873f4c52a8135385ecd7bfd6b9252&swfupload=1&api=1&market_main_photo=1',
    type: "POST",
    data: '../111.jpg',
    response: 'text',
    contentType: 'multipart/form-data',
    dataType: 'JSONP',
    success: function(data, textStatus){
      console.log(textStatus + 'Фото отправлено на сервер! ' + data);
    },
    error: function(error){
      console.log(error);
    },
  });

/*
  var photo = document.getElementById('file');
  var xhr = new XMLHttpRequest();
  var form = new FormData();

  photo.onchange=function(){
    var upload_file = file.files[0];
    form.append('fil', upload_file);
    xhr.open("post", getPhotoProduct(), true);
    xhr.send(upload_file);
    
    console.log(upload_file);
  }
  */
}

function savePhotoProduct(){
  var url = getPhotoProduct();
  sendRequest('photos.saveMarketPhoto', {group_id: 153061474, photo: "[{\"photo\":\"1758531b31:x\",\"sizes\":[[\"s\",\"841135573\",\"1a6c0\",\"v6jznWrFlNA\",75,75],[\"m\",\"841135573\",\"1a6c1\",\"C7_vemzUlbM\",130,130],[\"x\",\"841135573\",\"1a6c2\",\"Z6guDAlomkk\",402,402],[\"o\",\"841135573\",\"1a6c3\",\"RPL0IjbRdLg\",130,130],[\"p\",\"841135573\",\"1a6c4\",\"aMYMySrGdjw\",200,200],[\"q\",\"841135573\",\"1a6c5\",\"aq5edXco9AM\",320,320],[\"r\",\"841135573\",\"1a6c6\",\"KtYVzb3FbwM\",402,402]],\"kid\":\"83ae83227ac9eab44e8774a1c7535586\",\"debug\":\"xsxmxxxoxpxqxrx\"}]", server: 841135, hash: 'ea852fe33ac4c19642b99fe62d85353b', crop_data: 'oAAzVrwAAAAAyIrXVAAGmwmeoLgwJaJpJBAAGmxwyrsJBBk7EXCAAGmyCaO741fi_yHDAAGmyUQHh0dZCpdXEAAGmyuN_krSJgsQnFAAGmy6oFMAUTbX2mGAAGmzPqymidMHxv3', crop_hash: 'f128d3fc3c573958d0f94613694d0584'}, function(data){
    //[{\"photo\":\"7bd1ca106b:x\",\"sizes\":[[\"s\",\"633819852\",\"37ad9\",\"DvnfaTm33hY\",75,75],[\"m\",\"633819852\",\"37ada\",\"cEX9d-SUy2A\",130,130],[\"x\",\"633819852\",\"37adb\",\"RuYsz_jLHgs\",604,604],[\"o\",\"633819852\",\"37adc\",\"UHcixoGaPcw\",130,130],[\"p\",\"633819852\",\"37add\",\"Rvl9zpgbhH0\",200,200],[\"q\",\"633819852\",\"37ade\",\"ZCI6XRFcP4g\",320,320],[\"r\",\"633819852\",\"37adf\",\"qz84miJ-YJQ\",510,510]],\"kid\":\"8dd560da8e49366f79556497341862c4\",\"debug\":\"xsxmxxxoxpxqxrx\"}]
    console.log(data);
  });
};

function removeProduct(id){
  sendRequest('market.delete', {owner_id: -153061474, item_id: id}, function(data){
    console.log(data);//903315
  });
};

function restoreProduct(id){
  sendRequest('market.restore', {owner_id: -153061474, item_id: id}, function(data){
    console.log(data);//903315
  });
};

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
      '<button class="btn btn-danger" onclick="removeProduct(' + f.id + ')">Удалить</button>' +
      '<button class="btn btn-success" onclick="restoreProduct(' + f.id + ')">Восстановить</button>' +
      '</div>' + 
    '</div>';
  }
  $('.product-containet').html(html);
}