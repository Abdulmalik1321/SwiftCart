<?php
header("Access-Control-Allow-Origin: http://localhost:5173");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('Asia/Riyadh');

$all_orders = json_decode(file_get_contents("orders.json"));
$cart_id = floatval(end($all_orders)->cart_id) + 1;

$data = json_decode(file_get_contents('php://input'), true);

if ($data["cartAmount"] > 0) {

    $data['cart_id'] = strval($cart_id);
    $data['order_status'] = "pending";
    $data['date'] = date("l jS \of F Y h:i:s A");

    array_push($all_orders, $data);
    file_put_contents("orders.json", json_encode($all_orders, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
    exit();
} else {
    echo '<body style="background-color: #282c34; text-align: center; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;height: 120%;width: 100%;display: inline-block;color: white;"><img style="width: 20%;margin-top: 50px;" src="Exclamation_mark_white_icon.svg.png" alt=""><h1>اجمالي السلة يجب ان يكون اكبر من صفر</h1><br><br><br><a style="background-color: #1092a3;color: #282c34;padding: 10px;font-size: 15px;cursor: pointer;border-radius: 5px;border: 0px;font-weight: bold;text-decoration: none;" href="https://pcmod-sa.com/">العودة للصفحة الرئيسية</a></body>';
}
