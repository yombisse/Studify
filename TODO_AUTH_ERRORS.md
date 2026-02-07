# 📋 TODO - Gestion des Erreurs d'Authentification

## 🎯 Objectif
Implémenter une gestion des erreurs **claire et adaptée** aux différentes réponses du backend.

---

## 📊 Formats de Réponse Backend Attendus

### 1. **Erreur de validation (422)** - Champs spécifiques
```json
{
  "success": false,
  "message": "Validation échouée",
  "errors": {
    "email": "L'email est déjà utilisé",
    "password": "Le mot de passe est trop court"
  }
}
```

### 2. **Erreur d'authentification (401)** - Identifiants incorrects
```json
{
  "success": false,
  "message": "Email ou mot de passe incorrect"
}
```

### 3. **Erreur de serveur (500)**
```json
{
  "success": false,
  "message": "Erreur interne du serveur"
}
```

### 4. **Erreur réseau (pas de réponse)**
```json
{
  "success": false,
  "message": "Impossible de se connecter au serveur"
}
```

---

## ✅ Améliorations du Hook `useAuthError` (Version Simple & Flexible)

### Version Actuelle (`src/hooks/useAuthError.js`)
```javascript
// État basique - LIMITÉ
const [error, setError] = useState({
  email: '',
  password: '',
  general: '',
});
```

### Version Améliorée (À implémenter) - SIMPLE & FLEXIBLE

```javascript
// ✅ Version simple et extensible avec ...
export const useAuthError = () => {
  const [error, setError] = useState({
    general: '', // toujours présent
  });

  const setFieldError = (field, message) => {
    setError((prev) => ({
      ...prev,
      [field]: message,
      general: '', // effacer erreur générale quand un champ a une erreur
    }));
  };

  const setGeneralError = (message) => {
    setError((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        if (key !== 'general') acc[key] = '';
        return acc;
      }, {}),
      general: message,
    }));
  };

  const clearError = (field = null) => {
    setError((prev) => {
      if (field) {
        return { ...prev, [field]: '' };
      }
      // Effacer TOUT - créer un nouvel objet avec juste general
      return { general: '' };
    });
  };

  // ✅ Gestion automatique des erreurs API (tous les status)
  const handleApiError = (apiError) => {
    const { response, message } = apiError;
    const status = response?.status;
    const data = response?.data;

    // Erreur réseau
    if (!response) {
      setGeneralError("Impossible de se connecter au serveur. Vérifiez votre connexion.");
      return;
    }

    // Erreur 422 - Validation backend (clés dynamiques avec ...)
    if (status === 422 && data?.errors) {
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key]); // ✅ Pas de mapping - même nom !
      });
      return;
    }

    // Erreur 401 - Authentification échouée
    if (status === 401) {
      const errorMessage = data?.message || data?.error || message;
      const msgLower = errorMessage.toLowerCase();
      
      // Analyser le message pour trouver le champ
      if (msgLower.includes('password') || msgLower.includes('mot de passe')) {
        setFieldError('password', errorMessage);
      } else if (msgLower.includes('email')) {
        setFieldError('email', errorMessage);
      } else if (msgLower.includes('nom_util') || msgLower.includes('username')) {
        setFieldError('nom_utilisateur', errorMessage);
      } else if (msgLower.includes('nom') && !msgLower.includes('util')) {
        setFieldError('nom', errorMessage);
      } else if (msgLower.includes('prenom')) {
        setFieldError('prenom', errorMessage);
      } else {
        setGeneralError(errorMessage);
      }
      return;
    }

    // Erreur 400/403/404
    if (status >= 400 && status < 500) {
      setGeneralError(data?.message || "Requête invalide");
      return;
    }

    // Erreur 500+ - Serveur
    if (status >= 500) {
      setGeneralError("Erreur serveur. Veuillez réessayer plus tard.");
      return;
    }

    // Erreur par défaut
    setGeneralError(data?.message || message || "Une erreur est survenue");
  };

  return {
    error,
    setFieldError,
    clearError,
    setGeneralError,
    handleApiError,
  };
};
```

---

## 📝 Utilisation Simple

### Pas besoin de lister tous les champs !

```javascript
// Dans n'importe quel écran
const { error, setFieldError, clearError, handleApiError } = useAuthError();

// L'état error contiendra automatiquement les clés du backend
// Pas de mapping requis !

// Exemple avec update user
<FormInput error={error.nom_utilisateur} />
<FormInput error={error.nom} />
<FormInput error={error.prenom} />
<FormInput error={error.email} />
<FormInput error={error.telephone} />
<FormInput error={error.adresse} />
// ✅ Ajouter autant de champs que vous voulez !
```

---

## ✅ Version Simple & Flexible (Recommandée)

### Avantages
- ✅ **Pas de mapping** - les clés backend deviennent directement les clés frontend
- ✅ **Extensible** - ajouter autant de champs que vous voulez
- ✅ **Dynamique** - pas besoin de modifier le hook quand le backend change

```javascript
const useAuthError = () => {
  const [error, setError] = useState({ general: '' });

  const setFieldError = (field, message) => {
    setError((prev) => ({ ...prev, [field]: message, general: '' }));
  };

  const setGeneralError = (message) => {
    setError(() => {
      const keys = Object.keys(error);
      const cleared = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
      return { ...cleared, general: message };
    });
  };

  const clearError = (field = null) => {
    if (field) {
      setError((prev) => ({ ...prev, [field]: '' }));
    } else {
      setError({ general: '' });
    }
  };

  const handleApiError = (err) => {
    const { response } = err;
    if (!response) {
      setGeneralError("Connexion impossible");
      return;
    }
    if (response.status === 422 && response.data?.errors) {
      Object.keys(response.data.errors).forEach((key) => {
        setFieldError(key, response.data.errors[key]);
      });
      return;
    }
    if (response.status === 401) {
      const msg = response.data?.message || response.data?.error || err.message;
      if (msg.toLowerCase().includes('password')) setFieldError('password', msg);
      else if (msg.toLowerCase().includes('email')) setFieldError('email', msg);
      else setGeneralError(msg);
      return;
    }
    setGeneralError(response.data?.message || "Erreur");
  };

  return { error, setFieldError, clearError, setGeneralError, handleApiError };
};
```

### Utilisation dans les écrans

```javascript
// LoginScreen
const { error, handleApiError } = useAuthError();
try {
  await loginUser({ email, password });
} catch (err) {
  handleApiError(err);
}
<FormInput error={error.email} />
<FormInput error={error.password} />

// SignInScreen
<FormInput error={error.nom_utilisateur} />
<FormInput error={error.email} />
<FormInput error={error.password} />
<FormInput error={error.password_confirmation} />

// EditProfileScreen - AJOUTER autant de champs !
<FormInput error={error.nom} />
<FormInput error={error.prenom} />
<FormInput error={error.email} />
<FormInput error={error.telephone} />
<FormInput error={error.adresse} />
<FormInput error={error.filiere} />
// ✅ Le hook gère TOUT automatiquement !
```

---

**📌 Cette version est plus simple et extensible !**

---

## 🔄 Flux de Traitement des Erreurs

```
┌─────────────────┐
│  Requête API    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Succès (200)   │
│  ✅ Succès      │
└────────┬────────┘
         │
         ▼
    ┌────┴────┐
    │ Erreur  │
    └────┬────┘
         │
    ┌────▼────┐
    │  422    │ ──► handleValidationErrors(errors)
    │Validation│     └─► Set error.username/email/password
    └────┬────┘
         │
    ┌────▼────┐
    │  401    │ ──► handleApiError()
    │  Auth   │     └─► Set error.password ou error.general
    └────┬────┘
         │
    ┌────▼────┐
    │  400+   │ ──► handleApiError()
    │  Other  │     └─► Set error.general
    └────┬────┘
         │
    ┌────▼────┐
    │   Pas   │ ──► setGeneralError("Connexion impossible")
    │ Response│
    └─────────┘
```

---

## 💡 Exemples d'Utilisation

### LoginScreen
```javascript
try {
  const response = await loginUser({ email, password });
  if (response.success) {
    // Connexion réussie
  }
} catch (err) {
  handleApiError(err); // ✅ Gère automatiquement
}
```

### SignInScreen
```javascript
try {
  const response = await createUser(userData);
  if (response.success) {
    // Inscription réussie
  }
} catch (err) {
  handleApiError(err); // ✅ Gère 422 (email déjà utilisé, etc.)
}
```

---

## ✅ Checklist d'implémentation

- [ ] Mettre à jour `src/hooks/useAuthError.js` avec le nouveau code
- [ ] Tester avec erreur 422 (validation)
- [ ] Tester avec erreur 401 (mauvais credentials)
- [ ] Tester avec erreur réseau
- [ ] Vérifier l'affichage des erreurs sous les bons champs

---

## 🔍 Notes Importantes

1. **Le hook détecte automatiquement** le type d'erreur
2. **Pas besoin de modifier les écrans** - le hook fait tout le travail
3. **Messages en français** pour une meilleure UX
4. **Effacement automatique** des erreurs à la saisie

---

**📌 Répondez "OK" pour valider ce plan, ou précisez les modifications souhaitées.**
