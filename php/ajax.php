<?php
$image_path = dirname(__FILE__).'/111.jpg';
$cfile = curl_file_create($image_path,'image/jpeg','111.jpg');
$ch = curl_init('https://pu.vk.com/c841135/upload.php?act=do_add&mid=180517993&aid=-53&gid=153061474&hash=37f9508a36071f56dca3cf5b25a099d7&rhash=fe1873f4c52a8135385ecd7bfd6b9252&swfupload=1&api=1&market_main_photo=1');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, array("file" => $cfile));
$result = json_decode(curl_exec($ch), true);
print_r($result);
curl_close($ch);
?>