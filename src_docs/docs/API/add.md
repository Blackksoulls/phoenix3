title: API - Ajouter

## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/api/addentry.php)

## Explication du fonctionnement
*Le code est en php, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà des bases en programmation) [PHP in Ymin](https://learnxinyminutes.com/docs/php/)*

(^^Les lignes de code surlignées sont les plus importantes^^)

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
$pic = $request->pic;//$donnees['pic'];
$datevalue = $request->datevalue;//$donnees['date'];
```
