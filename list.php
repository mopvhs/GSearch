<?php
/**
 * Created by IntelliJ IDEA.
 * User: mopvhs
 * Date: 13-11-21
 * Time: 下午10:56
 * To change this template use File | Settings | File Templates.
 */
header('Content-type: application/json; charset=utf-8');
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

//$datas = $database->query("SELECT * FROM online_tools")->fetchAll();
$datas = $database->select("online_tools", "*");

$data = array( 'success' => true, 'data' => $datas );
$json = json_encode($data);

echo isset($_GET['callback'])
    ? "{$_GET['callback']}($json)"
    : $json;