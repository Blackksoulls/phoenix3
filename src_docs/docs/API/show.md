title: API - Afficher

## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/api/show.php) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

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
$show = $request->show ?: 'all';
```

* `:::php-in $postdata file_get_contents("php://input");` Récupère le contenu brut de la requete.
* `:::php-in $request = json_decode($postdata);` Traduit le contenu de la requete pour pouvoir le traiter dans le code (requete encodée en [JSON](https://learnxinyminutes.com/docs/json/))
* Ensuite les variables sont toutes traduites de la meme façon: `:::php-in $nouvelleVarPhp = $request->infoAretrouver ?: 'valeurParDefaut'`

### Test de la connection
```php-in
$con = mysql_connect($bdd_host,$bdd_user,$bdd_password) or die ('error');
mysql_select_db($bdd_db, $con);
```

* `:::php-in $con = mysql_connect($bdd_host,$bdd_user,$bdd_password)` Tente de se connecter à la BDD à l'aide de l'url et des identifiants.
* `:::php-in or die ("error");` Si l'API n'arrive pas à s'y connecter s'arrete là et renvoie le code **error**.
* `:::php-in mysql_select_db($bdd_db, $con)` Selectionne la BDD dans MySQL. (Chez nous la BDD phoenix3).

### Execution de notre requete d'ajout dans la BDD
```php-in
if ($show == 'all') {
$qry_res = mysql_query('SELECT * FROM ' . $table);
if (!$qry_res) {
    die('error');
}
$rows = array();
while ($r = mysql_fetch_assoc($qry_res)) {
    $rows[] = $r;
}
echo json_encode($rows);
};
```

* `:::php-in $qry_res = mysql_query('SELECT * FROM ' . $table);` Construit, execute la requete SQL pour afficher la table de la BDD.
* `:::php-in if (!$qry_res) {` Si il n'y a pas de réponse, arreter le programme et retourner le code **error**
* `:::php-in while ($r = mysql_fetch_assoc($qry_res)) {$rows[] = $r;}` Stocker la table récupérée dans un tableau.
* `:::php-in echo json_encode($rows);` Encoder le tableau en JSON et le renvoyer en retour.
