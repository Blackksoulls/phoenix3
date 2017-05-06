title: API - Ajouter

## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/api/addentry.php) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en php, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà des bases en programmation) [PHP in Ymin](https://learnxinyminutes.com/docs/php/)*

(^^Les lignes de code surlignées sont à ne pas oublier^^)

### Header
```php-in hl_lines="1 3 4"
error_reporting(0);
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
```

* `:::php-in error_reporting(0);` Défini le niveau d'erreur automatiques à 0, donc aucune erreur n'est retournée par php.
* `:::php-in header('Access-Control-Allow-Origin: *');`  Défini l'accès au fichier par une url. Ici, autorise tout le monde à y accéder. *Pas super sécurisé, je sais* :sweat:.
* `:::php-in header('Access-Control-Allow-Methods: GET, POST');` Accepte les requetes ^^POST^^ et les requetes ^^GET^^.

### Découpage de la requete
```php-in hl_lines="1 2"
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
$pic = $request->pic;
$datevalue = $request->datevalue;
```

* `:::php-in $postdata file_get_contents("php://input");` Récupère le contenu brut de la requete.
* `:::php-in $request = json_decode($postdata);` Traduit le contenu de la requete pour pouvoir le traiter dans le code (requete encodée en [JSON](https://learnxinyminutes.com/docs/json/))
* Ensuite les variables sont toutes traduites de la meme façon: `:::php-in $nouvelleVarPhp = $request->infoAretrouver ?: 'valeurParDefaut'`

### Test de la connection
```php-in
$con = mysql_connect($bdd_host,$bdd_user,$bdd_password) or die ("Failed to connect to MySQL: " . mysql_error());
mysql_select_db($bdd_db, $con);
```

* `:::php-in $con = mysql_connect($bdd_host,$bdd_user,$bdd_password)` Tente de se connecter à la BDD à l'aide de l'url et des identifiants.
* `:::php-in or die ("Failed to connect to MySQL: " . mysql_error());` Si l'API n'arrive pas à s'y connecter s'arrete là et renvoie un message d'erreur et l'erreur MySQL.
* `:::php-in mysql_select_db($bdd_db, $con)` Selectionne la BDD dans MySQL. (Chez nous la BDD phoenix3).

### Préparation de la requete
```php-in
$qry_em = 'SELECT count(*) as cnt from ' . $table . ' where textcontent="' . $textcontent . '"';
$qry_res = mysql_query($qry_em);
$res = mysql_fetch_assoc($qry_res);
```

* `:::php-in $qry_em = 'SELECT count(*) as  cnt from ' . $table . ' where textcontent="' . $textcontent . '"';` Construit une requete SQL qui selectionne tout le contenu de la table où le nom est égal au nom de notre objet ajouté.
* `:::php-in $qry_res = mysql_query($qry_em);` Execute la requete SQL dans la BDD et stocke me contenu dans une variable.
* `:::php-in $res = mysql_fetch_assoc($qry_res);` Transforme cette variable inutilisable telle qu'elle en un tableau associatif.

### Execution de notre requete d'ajout dans la BDD
```php-in
if($res['cnt']==0){
    $qry = 'INSERT INTO ' . $table .' (textcontent,price,nb,datevalue,pic) VALUES ("' . $textcontent . '","' . $price . '","' . $nb . '","' . $datevalue . '","' . $pic . '")';
    $qry_res = mysql_query($qry);
        if ($qry_res) {
            echo "1";
        } else {
            echo "2";
        }
    }
else
{
    echo "0";
}
```

* `:::php-in if($res['cnt']==0){` Teste si l'objet n'existe pas déjà dans la BDD. Si il est superieur à 0 renvoie un code d'erreur **0**.
* `:::php-in $qry = 'INSERT INTO ' . $table .' (textcontent,price,nb,datevalue,pic) VALUES ("' . $textcontent . '","' . $price . '","' . $nb . '","' . $datevalue . '","' . $pic . '")';` Construit la requete SQL pour ajouter l'objet dans la BDD.
* `:::php-in $qry_res = mysql_query($qry);` Execute la requete SQL et recupere le retour dans une variable.
* `:::php-in if($qry_res) {` Si il y a un retour MySQL, envoie un code de reussite **1**, sinon renvoie **2**
