title: ► Aide ◄

# Ou ?
- Sur la page *[begin](https://ionicframework.com/getting-started)* de Ionic.
- Sur la *[documentation](https://ionicframework.com/docs/)* de Ionic 2.
- En ouvrant une issue sur le *[github](https://github.com/blackksoulls/phoenix3/issues)* du projet.
- Ou en me contactant par un des liens sur la page [d'accueil](index.md) *(je ne sais pas quand je pourrais répondre :pensive:)*

## Pour télécharger le code depuis raw.github
- ++rbutton++ puis ==Enregistrer sous==
- ou ++ctrl+s++
- ou encore `#!shell wget "http://urldelapage"`
- ou bien `#!shell curl -O "http://urldelapage"`

## Conseils pour la préparation du Project
**1.** Installez nodejs et npm

- Par exemple pour linux: `#!shell apt install nodejs-legacy`
- Pour windows et mac téléchargez [l'installeur](https://nodejs.org/en/download/)

**2.** Installez cordova (ouvrer un invité de commande, pour windows ++win+r++ puis tapez ==*cmd*== et ++enter++) ensuite dans l'invite de commande, `#!shell npm install cordova -g`

**3.** Ensuite au tour de Ionic (toujours dans l'invite de commande) `#!shell npm install ionic -g`

**4.** Allez à l'endroit ou vous avez téléchargé mon code source, puis dans le dossier ==*phoenix3/src_code_v2/phoenix*==

- Pour rappel pour le télécharger: `#!shell git clone https://github.com/blackksoulls/phoenix3.git` puis `#!shell git checkout prod`(Et pour passer au code de l'API, un simple petit `#!shell git checkout api` dans le dépot téléchargé, *remplacez api par master pour repasser sur la branche principale*)
- Ou alors vous téléchargez l'archive [directement](https://github.com/Blackksoulls/phoenix3/archive/prod.zip). (Pour l'API ce sera [ici](https://github.com/Blackksoulls/phoenix3/archive/api.zip))

**5.** Faites un `#!shell npm install` pour installer les dépendances.

**6.** Et enfin `#!shell ionic serve --lab`

**7.** Vous pouvez maintenant aller voir l'application dans votre [navigateur](http://127.0.0.1:8100).

## Compiler l'application pour Android

**1.** Telecharger le [SDK Android](https://developer.android.com/studio/index.html). *(et l'extraire à l'endroit que vous preferez ==C:/android-sdk== ou encore ==/home/user/android-sdk==)*

**2.** Ajouter le SDK à votre path.

- Pour linux ajoutez dans ==~/.bashrc== *(ou equivalent)*:
```shell
export ANDROID_HOME="/path/to/android-sdk"
export PATH="$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:/home/kuro/android-studio/gradle/gradle-3.2/bin/"
```
- Pour window: [tuto](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) et ajoutez une autre variable *ANDROID_HOME* contenant le chemin vers le sdk.

**3.** Ensuite allez dans le dossier de l'application.

**4.** Executez la commande suivante: `#!shell cordova platform add android@6.2.3` *(cela ajoute la possibilite de compiler avec le dernier sdk de google)*

**5.** Ensuite **branchez votre telephone a l'ordinateur** et un petit `#!shell adb devices`, regardez que ^^votre telephone soit dans la liste et marque comme "device"^^ *(sinon acceptez la demande d'authorisation sur votre telephone)*, pour activer adb sur votre telephone allez dans les options de developpement. Et activez **Débogage USB**. *(Pour activer les options de dev. c'est [ici](http://www.frandroid.com/android/developpement/184906_comment-acceder-au-mode-developpeur-sur-android))*

**6.** Vous pouvez maintenant faire un `#!shell ionic run android` pour installer l'application par usb sur votre telephone.

**7.** Si vous voulez juste le fichier .apk: `#!shell ionic build android` et ensuite allez dans ==platforms/android/build/outputs/apk/== c'est le fichier ==^^android-debug.apk^^== qui s'y trouve.
