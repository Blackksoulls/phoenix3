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
    $show = $request->show ?: 'all';

    $con = mysql_connect($bdd_host,$bdd_user,$bdd_password) or die ('error');//("Failed to connect to MySQL: " . mysql_error($con));
    mysql_select_db($bdd_db, $con);

    if ($show == 'all') {
        $qry_res = mysql_query('SELECT * FROM ' . $table);

        if (!$qry_res) { // add this check.
            //die('Invalid query: ' . mysql_error($con));
            die('error');
        }

        $rows = array();

        while ($r = mysql_fetch_assoc($qry_res)) {
            $rows[] = $r;
        }

        echo json_encode($rows);
    };
?>
