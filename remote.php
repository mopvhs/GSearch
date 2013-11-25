<?php
/* 
* @Author: mopvhs
* @Date:   2013-11-25 16:06:28
* @Email:  email@example.com
* @Last modified by:   mopvhs
* @Last Modified time: 2013-11-25 17:05:35
*/
// header('Content-Type: image/gif');
header('Content-Type: application/json; charset=utf8');
header("access-control-allow-origin: *");
require 'medoo.php';

$database = new medoo(array(
    // required
    'database_type' => 'mysql',
    'database_name' => 'db_name',
    'server' => 'localhost',
    'username' => 'db_user_name',
    'password' => 'db_password',
    // optional
    'charset' => 'utf8',
    // driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
    'option' => array(
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    )
));

if(!isset($_GET['title']) || !isset($_GET['url'])) {
    return;
}
if(empty($_GET['title']) || empty($_GET['url'])) {
    return;
}

$title = trim($_GET['title']);
$url = trim($_GET['url']);

$title = htmlspecialchars($title, ENT_QUOTES);
$url = htmlspecialchars($url, ENT_QUOTES);
// 插入数据例子
$insert_id = $database->insert('online_tools', array(
    'title' => $title,
    'url' => $url,
    'sort' => 0
));
$result = $insert_id ? true : false;
$msg = $result ? '保存成功！' : $database->error();
$data = array( 'success' => $result, 'msg' => $msg );
$json = json_encode($data);

echo isset($_GET['callback'])
    ? "{$_GET['callback']}($json)"
    : $json;
?>