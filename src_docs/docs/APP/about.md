title: APP - About page

# A propos (page 'inapp')
## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/prod/phoenix/src/pages/about/about.ts) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en typescript, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà de ^^bonnes^^ bases en programmation) [TypeScript in Ymin](https://learnxinyminutes.com/docs/typescript/)*

### La seule fonction: GotoLink
```typescript
GotoLink(link) {
  window.open(link,'_system');
};
```
Cette fonction permet d'ouvrir les liens dans l'application, dans le navigateur par défaut
