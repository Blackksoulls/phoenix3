<?php
    error_reporting(0);
    header("Content-Type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $bdd_host = $request->host ?: 'localhost';
    $bdd_db = $request->dbdb ?: 'phoenix3';
    $bdd_user = $request->username ?: 'root';
    $bdd_password = $request->password ?: '';
    $table = $request->table ?: 'item_database';
    $textcontent = $request->textcontent;
    $price = $request->price;
    $nb = $request->nb;
    $pic = $request->pic;//$donnees['pic'];
    $datevalue = $request->datevalue;//$donnees['date'];
    $oldname = $request->oldname;

    $con = mysql_connect($bdd_host,$bdd_user,$bdd_password) or die ("Failed to connect to MySQL: " . mysql_error());
    mysql_select_db($bdd_db, $con);

    $qry_em = 'SELECT count(*) as cnt from ' . $table . ' WHERE textcontent="' . $oldname . '"';
    $qry_res = mysql_query($qry_em);
    $res = mysql_fetch_assoc($qry_res);

    if($res['cnt']==1){
        $qry = 'UPDATE item_database SET textcontent="'. $textcontent .'",price="'. $price .'",nb="'. $nb .'", datevalue="'. $datevalue .'", pic="'. $pic .'" WHERE textcontent="'. $oldname .'";';
        $qry_res = mysql_query($qry);
            if ($qry_res) {
                echo "1";
            } else {
                echo "2";
            }
        }
?>
