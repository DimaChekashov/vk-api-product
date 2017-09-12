(function(window){
  'use strict';
  var App = window.App || {};


  function CreateProduct(){

  };

  // Для примера заполнения => name: 'test-name', description: 'test-desccription', category_id: 2, price: 1000, main_photo_id: 456239022
  CreateProduct.prototype.add = function(name, desc, category_id, price, main_photo){
    App.SendRequest('market.add', {owner_id: -153061474, name: name, description: desc, category_id: category_id, price: price, main_photo_id: create.savePhotoProduct()}, function(data){
      console.log(data);
    });
  };

  CreateProduct.prototype.getPhotoUrl = function(){
    App.SendRequest('photos.getMarketUploadServer', {group_id: 153061474, main_photo: 1, crop_x: 400, crop_y: 400}, function(data){
      console.log(data.response.upload_url);
      var url = data.response.upload_url;

      $.ajax({
        url: '../php/ajax.php',
        type: "POST",
        data: "url=" + url,
        dataType: 'JSON',
        success: function(data, textStatus){
          console.log(textStatus + 'Фото отправлено на сервер! ' + data);
        },
        error: function(error){
          console.log(error);
        },
      });      
    });
  };

  CreateProduct.prototype.sendPhotoToServer = function(url){ 
    $.ajax({
      url: '../php/ajax.php',
      type: "POST",
      data: "url=" + url,
      dataType: 'JSON',
      success: function(data, textStatus){
        console.log(textStatus + 'Фото отправлено на сервер! ' + data);
      },
      error: function(error){
        console.log(error);
      },
    });
  };

  CreateProduct.prototype.photo = function(){
    create.getPhotoUrl();
    setTimeout(function(){ console.log(this.data)}, 3000);
    //create.sendPhotoToServer(url);
  }

  CreateProduct.prototype.savePhotoProduct = function(){
    var photo = [
      "<?php echo $result['server'] ?>",
      "<?php echo $result['photos_list'] ?>",
      "<?php echo $result['aid'] ?>",
      "<?php echo $result['hash'] ?>",
      "<?php echo $result['gid'] ?>"
    ]
    return App.SendRequest('photos.saveMarketPhoto', {group_id: 153061474, photo: "[{\"photo\":\"1758531b31:x\",\"sizes\":[[\"s\",\"841135573\",\"1a6c0\",\"v6jznWrFlNA\",75,75],[\"m\",\"841135573\",\"1a6c1\",\"C7_vemzUlbM\",130,130],[\"x\",\"841135573\",\"1a6c2\",\"Z6guDAlomkk\",402,402],[\"o\",\"841135573\",\"1a6c3\",\"RPL0IjbRdLg\",130,130],[\"p\",\"841135573\",\"1a6c4\",\"aMYMySrGdjw\",200,200],[\"q\",\"841135573\",\"1a6c5\",\"aq5edXco9AM\",320,320],[\"r\",\"841135573\",\"1a6c6\",\"KtYVzb3FbwM\",402,402]],\"kid\":\"83ae83227ac9eab44e8774a1c7535586\",\"debug\":\"xsxmxxxoxpxqxrx\"}]", server: photo[0], hash: photo[3], crop_data: 'oAAzVrwAAAAAyIrXVAAGmwmeoLgwJaJpJBAAGmxwyrsJBBk7EXCAAGmyCaO741fi_yHDAAGmyUQHh0dZCpdXEAAGmyuN_krSJgsQnFAAGmy6oFMAUTbX2mGAAGmzPqymidMHxv3', crop_hash: 'f128d3fc3c573958d0f94613694d0584'}, function(data){
      //[{\"photo\":\"7bd1ca106b:x\",\"sizes\":[[\"s\",\"633819852\",\"37ad9\",\"DvnfaTm33hY\",75,75],[\"m\",\"633819852\",\"37ada\",\"cEX9d-SUy2A\",130,130],[\"x\",\"633819852\",\"37adb\",\"RuYsz_jLHgs\",604,604],[\"o\",\"633819852\",\"37adc\",\"UHcixoGaPcw\",130,130],[\"p\",\"633819852\",\"37add\",\"Rvl9zpgbhH0\",200,200],[\"q\",\"633819852\",\"37ade\",\"ZCI6XRFcP4g\",320,320],[\"r\",\"633819852\",\"37adf\",\"qz84miJ-YJQ\",510,510]],\"kid\":\"8dd560da8e49366f79556497341862c4\",\"debug\":\"xsxmxxxoxpxqxrx\"}]
      console.log(data);
    });
  }

  App.CreateProduct = CreateProduct;
  window.App = App;
})(window);