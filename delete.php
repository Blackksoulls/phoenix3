<?php
    error_reporting(0);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $bdd_host = $request->host ?: 'localhost';
    $bdd_db = $request->dbdb ?: 'phoenix3';
    $bdd_user = $request->username ?: 'root';
    $bdd_password = $request->password ?: '';
    $table = $request->table ?: 'item_database';
    $item_name = $request->item_name;

    $con = mysql_connect($bdd_host,$bdd_user,$bdd_password) or die ("Failed to connect to MySQL: " . mysql_error());
    mysql_select_db('phoenix3', $con);

    $qry_em = 'SELECT count(*) as cnt from ' . $table . ' where textcontent="' . $textcontent . '"';
    $qry_res = mysql_query($qry_em);
    $res = mysql_fetch_assoc($qry_res);

    if($res['cnt']==0){
        $qry = 'DELETE FROM ' . $bdd_db . '.' . $table . ' WHERE ' . $table . '.' . 'textcontent="' . $item_name . '"';
        $qry_res = mysql_query($qry);
            if ($qry_res) {
                echo "1";
            } else {
                echo "2";
            }
        }
?>
