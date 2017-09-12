<?php

if($_POST['url']) {
  $url = $_POST['url'];
  $mid = $_POST['mid'];
  $aid = $_POST['aid'];
  $gid = $_POST['gid'];
  $hash = $_POST['hash'];
  $rhash = $_POST['rhash'];
  $swfupload = $_POST['swfupload'];
  $api = $_POST['api'];
  $market_main_photo = $_POST['market_main_photo'];
  //https://pu.vk.com/c841522/upload.php?act=do_add&mid=180517993&aid=-53&gid=153061474&hash=6c0bb36fbe2bd59e895f56d7a94317da&rhash=264511add8a2c45ac388ab771e9ec135&swfupload=1&api=1&market_main_photo=1
  $main_url = '';
  $main_url = '' . $url . '&mid=' . $mid . '&aid=' . $aid . '&gid=' . $gid . '&hash=' . $hash . '&rhash=' . $rhash . '&swfupload=' . $swfupload . '&api=' . $api . '&market=' . $market_main_photo . '';
  $image_path = dirname(__FILE__).'/111.jpg';
  $cfile = curl_file_create($image_path,'image/jpeg','111.jpg');
  $ch = curl_init($main_url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, array("file" => $cfile));
  $result = json_decode(curl_exec($ch), true);
  print_r($result);
  curl_close($ch);
  print_r($main_url);
  print_r(dirname(__FILE__));
  
}
?>