# 📱 Documentation Technique - Studify

## Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Architecture du projet](#architecture-du-projet)
3. [Stack Technologique](#stack-technologique)
4. [Structure des dossiers](#structure-des-dossiers)
5. [Système de navigation](#système-de-navigation)
6. [Fonctionnalités](#fonctionnalités)
7. [Gestion des erreurs](#gestion-des-erreurs)
8. [Services API](#services-api)
9. [Composants réutilisables](#composants-réutilisables)
10. [Hooks personnalisés](#hooks-personnalisés)
11. [Services utilitaires](#services-utilitaires)
12. [Installation et configuration](#installation-et-configuration)
13. [Patterns et conventions](#patterns-et-conventions)

---

## 📋 Vue d'ensemble du projet

### Description
**Studify** est une application mobile de gestion d'étudiants développée en React Native. Elle permet aux utilisateurs de :
- S'authentifier (connexion/inscription)
- Consulter un tableau de bord avec des statistiques
- Gérer la liste des étudiants (CRUD complet)
- Modifier son profil utilisateur
- Gérer les mots de passe (réinitialisation)

### Caractéristiques principales
- **Plateformes cibles** : Android et iOS
- **Mode hors-ligne** : AsyncStorage pour la persistance des tokens
- **UI/UX** : Design moderne avec Material Design (React Native Paper)
- **Gestion d'état** : React Navigation + Hooks (useState, useEffect, useMemo)
- **Gestion des erreurs** : Hook personnalisé `useAuthError` pour gérer les erreurs API

---

## 🏗️ Architecture du projet

```
Studify/
├── android/                 # Configuration Android native
├── ios/                     # Configuration iOS native
├── src/                     # Code source principal
│   ├── api/                # Services API
│   ├── assets/             # Ressources (images, styles)
│   ├── components/         # Composants réutilisables
│   ├── hooks/              # Hooks personnalisés
│   ├── navigation/         # Configuration navigation
│   ├── screens/            # Écrans de l'application
│   ├── utils/              # Fonctions utilitaires
│   └── App.tsx             # Point d'entrée
├── package.json            # Dépendances
└── DOCUMENTATION.md        # Cette documentation
```

### Diagramme de navigation

```
App.tsx
    │
    └── AppNavigator (Stack)
            │
            ├── WelcomeScreen (Screen)
            │
            ├── LoginScreen (Screen)
            ├── SignInScreen (Screen)
            │
            └── Home (Drawer)
                    │
                    ├── Profile (Stack)
                    │       └── ProfileScreen
                    │       └── EditProfileScreen
                    │       └── EditPasswordScreen
                    │
                    └── BottomTabNavigator (Tabs)
                            │
                            ├── DashboardStack
                            │       └── DashboardScreen
                            │
                            ├── StudentStack
                            │       ├── StudentListScreen
                            │       ├── AddStudentForm
                            │       └── StudentDetailScreen
                            │
                            └── StatStack
                                    └── StatScreen
```

---

## 💻 Stack Technologique

### Dépendances principales

| Catégorie | Package | Version | Usage |
|-----------|---------|---------|-------|
| **Core** | react | 19.2.0 | Framework UI |
| | react-native | 0.83.1 | Plateforme mobile |
| **Navigation** | @react-navigation/native | 7.1.28 | Navigation core |
| | @react-navigation/stack | 7.6.16 | Stack navigation |
| | @react-navigation/drawer | 7.7.13 | Drawer menu |
| | @react-navigation/bottom-tabs | 7.10.1 | Bottom tabs |
| **UI** | react-native-paper | 5.14.5 | Composants Material |
| | react-native-vector-icons | 10.3.0 | Icônes |
| | react-native-linear-gradient | 2.8.3 | Dégradés |
| **API** | axios | 1.13.2 | Client HTTP |
| **Storage** | @react-native-async-storage/async-storage | 2.2.0 | Stockage local |
| **Media** | react-native-image-picker | 8.2.1 | Sélection images |
| | react-native-phone-entry | 0.2.4 | Saisie téléphone internationale |
| **Charts** | react-native-gifted-charts | 1.4.71 | Graphiques |

---

## 📁 Structure des dossiers

### Détail du dossier `src/`

```
src/
├── api/                          # Couche d'accès aux données
│   ├── api.js                   # Configuration Axios + interceptor JWT
│   ├── authService.js           # Service authentification
│   └── studentService.js        # Service gestion étudiants
│
├── assets/                      # Ressources statiques
│   ├── images/                  # Images (Logo.png, fille.png, garcon.png, total.png)
│   └── styles/                 # Styles JS partagés
│
├── components/                  # Composants React Native réutilisables
│   ├── AppButton.tsx           # Bouton personnalisé
│   ├── AppInput.tsx            # Champ de saisie
│   ├── AppText.tsx             # Texte avec props simplifiée
│   ├── AppHeader.tsx           # En-tête d'écran
│   ├── Avatar.tsx              # Avatar utilisateur
│   ├── Card.tsx                # Carte avec elevation
│   ├── ListItem.tsx            # Élément de liste
│   ├── ModalConfirm.tsx        # Modal confirmation suppression
│   ├── ShowImageModal.tsx      # Modal affichage image agrandie
│   ├── UpdatePasswordModal.tsx  # Modal mot de passe
│   ├── profileImagePicker.tsx   # Sélecteur d'image profil
│   └── StudifyLogo.tsx          # Logo de l'application
│
├── hooks/                       # Hooks personnalisés
│   └── useAuthError.js         # Gestion centralisée des erreurs API
│
├── navigation/                  # Configuration navigation
│   ├── AppNavigator.tsx        # Navigation root
│   ├── drawer/
│   │   ├── Drawer.tsx         # Drawer navigator
│   │   └── customDrawer.tsx   # Contenu personnalisé drawer
│   ├── stack/
│   │   ├── MainStack.tsx      # Stack principal (Welcome/Login/SignIn)
│   │   ├── dashboardStack.tsx
│   │   ├── profileStack.tsx
│   │   ├── statStack.tsx
│   │   └── StudentStack.tsx
│   └── tab/
│       └── BottomTabNavigator.tsx
│
├── screens/                    # Écrans de l'application
│   ├── WelcomeScreen.tsx       # Écran d'accueil avec animations
│   ├── DashboardScreen.tsx     # Tableau de bord + stats
│   ├── StatScreen.tsx          # Statistiques détaillées
│   ├── auth/
│   │   ├── LoginScreen.tsx     # Écran connexion
│   │   ├── SignInScreen.tsx    # Écran inscription
│   │   ├── EmailCheckModal.tsx # Modal vérification email
│   │   └── ForgotPasswordScreen.tsx # Écran mot de passe oublié
│   ├── profile/
│   │   ├── ProfileScreen.tsx   # Profil utilisateur
│   │   ├── EditProfileScreen.tsx # Modifier profil
│   │   └── EditPasswordScreen.tsx # Modifier mot de passe
│   └── student/
│       ├── StudentListScreen.tsx  # Liste des étudiants
│       ├── AddStudentForm.tsx     # Ajout/Modification étudiant
│       └── StudentDetailScreen.tsx # Détail étudiant
│
├── utils/                       # Utilitaires
│   ├── apiHelpers.js          # Wrapper requêtes API
│   ├── logoutHandler.js       # Gestion déconnexion
│   └── util.js                # Fonctions utilitaires
│
└── App.tsx                     # Point d'entrée application
```

---

## 🧭 Système de navigation

### Hiérarchie complète

```
App.tsx (SafeAreaView + StatusBar)
    └── NavigationContainer
            │
            ├── Stack.Navigator (headerShown: false)
            │       │
            │       ├── Stack.Screen: "Welcome" → WelcomeScreen
            │       │       └── Animation + timeout 5s → Login
            │       │
            │       ├── Stack.Screen: "Login" → LoginScreen
            │       │       └── Modal: EmailCheckModal
            │       │
            │       └── Stack.Screen: "SignIn" → SignInScreen
            │
            └── Stack.Screen: "Home" → Drawer
                    │
                    └── Drawer.Navigator
                            │
                            ├── Drawer.Screen: "Home" → BottomTabNavigator
                            │       └── Tab.Navigator (tabBarStyle: #1E88E5)
                            │               │
                            │               ├── Tab: "Dashboard" → DashboardStack
                            │               │       └── DashboardScreen
                            │               │
                            │               ├── Tab: "Students" → StudentStack
                            │               │       ├── StudentListScreen
                            │               │       ├── AddStudentForm
                            │               │       └── StudentDetailScreen
                            │               │
                            │               └── Tab: "Stats" → StatStack
                            │                       └── StatScreen
                            │
                            └── Drawer.Screen: "Profile" → ProfileStack
                                    ├── ProfileScreen
                                    ├── EditProfileScreen
                                    └── EditPasswordScreen
```

### Navigation principaux flux

| De | Vers | Action |
|----|------|--------|
| WelcomeScreen | LoginScreen | `navigation.replace("Login")` après 5s |
| LoginScreen | Home (Drawer) | `navigation.replace("Home", { user })` |
| LoginScreen | SignInScreen | `navigation.navigate("SignIn")` |
| SignInScreen | LoginScreen | `navigation.replace("Login")` |
| DashboardScreen | StudentStack | Via bottom tabs |
| StudentListScreen | AddStudentForm | `navigation.navigate('Add', { user })` |
| ProfileScreen | EditProfileScreen | `navigation.navigate('EditProfile', { user })` |
| ProfileScreen | EditPasswordScreen | `navigation.navigate('EditPassword')` |

### Transfert de paramètres

```typescript
// Exemple de transmission de paramètres
navigation.navigate('ScreenName', { user, id: 123 });

// Réception dans l'écran cible
const { user, id } = route.params || {};
```

---

## ✨ Fonctionnalités

### 1. Écran d'accueil (WelcomeScreen)

**Fichier** : `src/screens/WelcomeScreen.tsx`

**Fonctionnalités** :
- Animation d'entrée avec fade + scale (Animated API)
- Logo Studify centré
- Redirection automatique vers Login après 5 secondes

**Code clé** :
```typescript
useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
    Animated.timing(scaleAnim, { toValue: 1, duration: 1500, easing: Easing.out(Easing.exp), useNativeDriver: true }),
  ]).start();
  
  const timer = setTimeout(() => navigation.replace("Login"), 5000);
  return () => clearTimeout(timer);
}, []);
```

---

### 2. Authentification

#### LoginScreen (`src/screens/auth/LoginScreen.tsx`)

**Champs** :
- Login/Email
- Password

**Fonctionnalités** :
- Validation des champs
- Appel API `loginUser()`
- Stockage du token JWT dans AsyncStorage
- Gestion mot de passe oublié via modal EmailCheckModal
- Navigation vers Inscription
- Affichage des erreurs via hook `useAuthError`

**Code clés** :
```typescript
const handleLogin = async () => {
  clearError();
  
  if (!login || !password) {
    if (!login) setFieldError("email", "Le login/email est requis");
    if (!password) setFieldError("password", "Le mot de passe est requis");
    return;
  }

  try {
    setLoading(true);
    const response = await loginUser({ email: login, password });

    if (response.success) {
      const { token, user } = response;
      await AsyncStorage.setItem("authToken", token);
      navigation.replace("Home", { user });
    } else {
      // Le backend retourne 404 avec {errors: {...}} - creer une fausse erreur
      const fakeError = {
        response: {
          status: 404,
          data: response
        }
      };
      handleApiError(fakeError);
    }
  } catch (err) {
    handleApiError(err);
  } finally {
    setLoading(false);
  }
};
```

#### SignInScreen (`src/screens/auth/SignInScreen.tsx`)

**Champs** :
- Username (min 3 caractères)
- Email (validation regex)
- Password (8-12 chars, 1 majuscule, 1 chiffre, 1 spécial)
- Confirmation mot de passe

**Validation** :
```typescript
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,12}$/;
```

#### EmailCheckModal (`src/screens/auth/EmailCheckModal.tsx`)

**Fonctionnalités** :
- Vérification si l'email existe via `checkEmailExists()`
- Envoi du code de réinitialisation

#### ForgotPasswordScreen (`src/screens/auth/ForgotPasswordScreen.tsx`)

**Fonctionnalités** :
- Réinitialisation du mot de passe via `forgotPassword()`
- Validation du nouveau mot de passe

---

### 3. Tableau de bord (DashboardScreen)

**Fichier** : `src/screens/DashboardScreen.tsx`

**Statistiques affichées** :
- Total étudiants inscrits
- Nombre de garçons
- Nombre de filles

**Actions** :
- Liste des 2 derniers étudiants inscrits (FlatList horizontale)
- Bouton "Ajouter un étudiant"
- Lien "Voir plus" vers la liste complète

**Code de récupération données** :
```typescript
useEffect(() => {
  const loadStats = async () => {
    const res = await fetchStats();
    const response = await fetchStudents();
    setStats(res.stats);
    setStudents(response.data.slice(0, 2));
  };
  loadStats();
  const unsubscribe = navigation.addListener('focus', loadStats);
  return unsubscribe;
}, [navigation]);
```

---

### 4. Gestion des étudiants

#### StudentListScreen (`src/screens/student/StudentListScreen.tsx`)

**Fonctionnalités** :
- Liste paginée avec FlatList
- Barre de recherche (nom, prénom, téléphone, email)
- Pull-to-refresh
- Actions par étudiant :
  - Modifier (icône crayon)
  - Supprimer (icône poubelle avec ConfirmDeleteModal)
  - Voir détail (flèche)
- Bouton flottant "Ajouter"

**Filtrage** :
```typescript
const filteredStudents = useMemo(() => {
  const q = search.trim().toLowerCase();
  if (!q) return students;
  return students.filter((s) =>
    [s.nom, s.prenom, s.telephone, s.email]
      .filter(Boolean)
      .some((field) => field.toString().toLowerCase().includes(q))
  );
}, [search, students]);
```

#### AddStudentForm (`src/screens/student/AddStudentForm.tsx`)

**Champs du formulaire** :
| Champ | Type | Validation |
|-------|------|------------|
| Nom | Texte | min 2 caractères |
| Prénom | Texte | min 2 caractères |
| Âge | Nombre | requis |
| Sexe | Texte | M ou F |
| Téléphone | Téléphone | format international |
| Email | Email | regex email |
| Adresse | Texte | min 5 caractères |
| Filière | Texte | requis |

**Fonctionnalités** :
- Mode ajout / modification (détecté via param `student`)
- Sélecteur d'image de profil (`profileImagePicker`)
- Validation avant soumission
- Appel API `createStudent()` ou `updateStudent()`

#### StudentDetailScreen (`src/screens/student/StudentDetailScreen.tsx`)

**Fonctionnalités** :
- Affichage complet des détails d'un étudiant
- Navigation depuis StudentListScreen
- Actions de modification/suppression

---

### 5. Profil utilisateur

#### ProfileScreen (`src/screens/profile/ProfileScreen.tsx`)

**Informations affichées** :
- Avatar agrandi avec aperçu agrandi via ShowImageModal
- Nom complet
- Username (@)
- Email
- Rôle

**Actions** :
- Modifier le profil (icône crayon → EditProfileScreen)
- Réinitialiser mot de passe (icône cadenas → EditPasswordScreen)
- Déconnexion (icône porte → logoutHandler)

#### EditProfileScreen (`src/screens/profile/EditProfileScreen.tsx`)

**Fonctionnalités** :
- Modification des informations utilisateur
- Upload de photo de profil

#### EditPasswordScreen (`src/screens/profile/EditPasswordScreen.tsx`)

**Fonctionnalités** :
- Modification du mot de passe
- Validation de l'ancien mot de passe

---

## 🔧 Gestion des erreurs

### Hook useAuthError (`src/hooks/useAuthError.js`)

Hook personnalisé pour gérer centralement les erreurs API.

```javascript
export const useAuthError = () => {
  const [error, setError] = useState({});

  // Effacer une erreur spécifique ou toutes les erreurs
  const clearError = useCallback((field = null) => {
    if (field) {
      setError((prev) => ({ ...prev, [field]: "" }));
    } else {
      setError({});
    }
  }, []);

  // Définir une erreur pour un champ spécifique
  const setFieldError = useCallback((field, message) => {
    setError((prev) => ({
      ...prev,
      [field]: message,
      general: "",
    }));
  }, []);

  // Définir une erreur générale
  const setGeneralError = useCallback((message) => {
    setError(() => {
      const keys = Object.keys(error);
      const cleared = keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
      return { ...cleared, general: message };
    });
  }, [error]);

  // Gérer automatiquement les erreurs API
  const handleApiError = useCallback((err) => {
    const response = err.response;
    
    if (!response) {
      setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
      return;
    }

    const status = response.status;
    const data = response.data;

    // Erreur 422 - Validation backend
    if (status === 422 && data?.errors) {
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key]);
      });
      return;
    }

    // Erreur 401 - Authentification échouée
    if (status === 401) {
      const msg = data?.message || data?.error || err.message;
      const msgLower = msg.toLowerCase();

      if (msgLower.includes("password")) {
        setFieldError("password", msg);
      } else if (msgLower.includes("email")) {
        setFieldError("email", msg);
      } else if (msgLower.includes("nom_util") || msgLower.includes("username")) {
        setFieldError("nom_utilisateur", msg);
      } else if (msgLower.includes("nom") && !msgLower.includes("util")) {
        setFieldError("nom", msg);
      } else if (msgLower.includes("prenom")) {
        setFieldError("prenom", msg);
      } else {
        setGeneralError(msg);
      }
      return;
    }

    // Erreur 400 - Bad Request
    if (status === 400) {
      if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key]);
        });
      } else {
        setGeneralError(data?.message || "Requête invalide");
      }
      return;
    }

    // Erreur 403 - Accès interdit
    if (status === 403) {
      setGeneralError("Vous n'avez pas l'autorisation d'effectuer cette action");
      return;
    }

    // Erreur 404 - Non trouvé (IMPORTANT pour login échoué)
    if (status === 404) {
      if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key]);
        });
      } else {
        setGeneralError("Ressource non trouvée");
      }
      return;
    }

    // Erreur serveur (500+)
    if (status >= 500) {
      setGeneralError("Erreur serveur. Veuillez réessayer plus tard.");
      return;
    }

    setGeneralError(data?.message || err.message || "Une erreur est survenue");
  }, [setFieldError, setGeneralError]);

  return { error, setError, clearError, setFieldError, setGeneralError, handleApiError };
};
```

### Utilisation dans les écrans

```typescript
import { useAuthError } from '../../hooks/useAuthError';

const LoginScreen = ({ navigation }) => {
  const { error, clearError, setFieldError, handleApiError } = useAuthError();

  const handleLogin = async () => {
    clearError();
    // ... logique de login
  };

  // Les erreurs s'affichent automatiquement dans les FormInput
  return (
    <FormInput error={error.email} />
    <FormInput error={error.password} />
  );
};
```

---

## 🔌 Services API

### Configuration principale (`src/api/api.js`)

```javascript
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://92.168.11.113:8000/api", // IP backend local
});

// Intercepteur pour ajouter le token JWT automatiquement à chaque requête
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Service Authentification (`src/api/authService.js`)

| Fonction | Méthode | Endpoint | Description |
|----------|---------|----------|-------------|
| `loginUser(payload)` | POST | /auth/login | Connexion utilisateur |
| `createUser(payload)` | POST | /auth/register | Création compte |
| `logoutUser()` | POST | /auth/logout | Déconnexion |
| `fetchProfile()` | GET | /auth/profile | Profil connecté |
| `forgotPassword(payload)` | POST | /auth/forgot-password | Mot de passe oublié |
| `checkEmailExists(email)` | POST | /auth/check-email | Vérifier email |
| `updateUser(id, payload)` | PUT | /auth/:id | Modifier utilisateur |

### Service Étudiants (`src/api/studentService.js`)

| Fonction | Méthode | Endpoint | Description |
|----------|---------|----------|-------------|
| `fetchStudents(params)` | GET | /students | Liste étudiants |
| `fetchStats()` | GET | /students/stats | Statistiques |
| `createStudent(payload)` | POST | /students | Créer étudiant |
| `updateStudent(id, payload)` | PUT | /students/:id | Modifier étudiant |
| `deleteStudent(id)` | DELETE | /students/:id | Supprimer étudiant |

### Wrapper requêtes (`src/utils/apiHelpers.js`)

```javascript
export const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
```

---

## 🧩 Composants réutilisables

### AppButton (`src/components/AppButton.tsx`)

```typescript
interface AppButtonProps {
  text?: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: ReactNode;
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E88E5',
  },
});
```

### AppAvatar (`src/components/Avatar.tsx`)

```typescript
interface AppAvatarProps {
  initials?: string;
  image?: string;
  size?: number;
  style?: ViewStyle;
}

// Affiche l'image si disponible, sinon les initiales (fallback automatique)
```

### Card (`src/components/Card.tsx`)

```typescript
// Carte avec elevation (ombres) pour effet 3D
// Style par défaut : borderRadius: 12, padding: 20, elevation: 3
```

### AppHeader (`src/components/AppHeader.tsx`)

```typescript
interface AppHeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  titleStyle?: TextStyle;
  style?: ViewStyle;
}
```

### FormInput (`src/components/AppInput.tsx`)

```typescript
interface FormInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  error?: string;
  type?: 'search' | 'phone';
  onChangeCountry?: (country: Country) => void;
}
```

### ConfirmDeleteModal (`src/components/ModalConfirm.tsx`)

```typescript
interface ConfirmDeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  nom: string;
  prenom: string;
}
```

### ProfileImagePicker (`src/components/profileImagePicker.tsx`)

```typescript
interface ProfileImagePickerProps {
  image: string;
  onChange: (uri: string) => void;
}
```

---

## 🪝 Hooks personnalisés

### useAuthError (`src/hooks/useAuthError.js`)

Voir section [Gestion des erreurs](#gestion-des-erreurs)

---

## 🛠️ Services utilitaires

### Gestionnaire de déconnexion (`src/utils/logoutHandler.js`)

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../api/authService";

export const logoutHandler = async (navigation) => {
  try {
    await logoutUser(); // Appel API déconnexion
  } catch (error) {
    console.log("Erreur logout API:", error);
  } finally {
    await AsyncStorage.removeItem("authToken"); // Suppression token local
    navigation.replace("Welcome"); // Redirection vers Welcome
  }
};
```

### Utilitaires (`src/utils/util.js`)

```javascript
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  // Validation via react-native-phone-entry
  return isValidNumber(phone, countryCode);
};
```

---

## 📦 Installation et configuration

### Prérequis

- Node.js >= 20
- React Native CLI ou Expo
- Android Studio (pour Android) / Xcode (pour iOS)

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd Studify

# Installer les dépendances
npm install

# ou avec Yarn
yarn install
```

### Configuration Android

```bash
# Lancer sur Android
npm run android

# ou
yarn android
```

### Configuration iOS

```bash
# Installer les pods
bundle install
bundle exec pod install

# Lancer sur iOS
npm run ios

# ou
yarn ios
```

### Configuration API

Modifier le fichier `src/api/api.js` :

```javascript
const api = axios.create({
  baseURL: "http://TON_IP:8000/api", // Remplacez par votre IP backend
});
```

> **Note** : L'IP `92.168.11.113` est actuellement configurée pour le développement local.

---

## 📐 Patterns et conventions

### Conventions de nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `DashboardScreen.tsx` |
| Hooks | camelCase avec prefix "use" | `useAuthError` |
| Fonctions | camelCase | `handleLogin()` |
| Constantes | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Styles | camelCase | `container`, `buttonText` |
| Fichiers hooks | camelCase | `useAuthError.js` |

### Gestion d'état

```typescript
// State local
const [state, setState] = useState(initialValue);

// State avec effet secondaire
useEffect(() => {
  // Code à exécuter
  return () => {
    // Nettoyage
  };
}, [dependencies]);

// State calculé (optimisé)
const computedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

### Gestion des erreurs API

```typescript
try {
  // Requête API
  const response = await apiCall();
  
  if (!response.success) {
    // Erreur business logic (status 200 avec success: false)
    handleApiError({ response: { status: 404, data: response } });
  }
} catch (error) {
  // Erreur réseau ou HTTP
  handleApiError(error);
}
```

---

## 📊 Flux de données

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AsyncStorage  │◄────│     api.js      │◄────│  authService    │
│   (authToken)    │     │ (interceptor)   │     │  studentService │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │              ┌─────────────────┐               │
         └─────────────►│   Backend API   │◄──────────────┘
                        │  (Laravel/Node) │
                        └─────────────────┘
```

---

## 🚀 Routes API Backend

| Endpoint | Méthode | Status Réponse | Description |
|----------|---------|---------------|-------------|
| `/api/auth/login` | POST | 200/404 | Connexion |
| `/api/auth/register` | POST | 200/422 | Inscription |
| `/api/auth/logout` | POST | 200 | Déconnexion |
| `/api/auth/profile` | GET | 200 | Profil utilisateur |
| `/api/auth/forgot-password` | POST | 200 | Mot de passe oublié |
| `/api/auth/check-email` | POST | 200 | Vérifier email |
| `/api/students` | GET | 200 | Liste étudiants |
| `/api/students/stats` | GET | 200 | Statistiques |
| `/api/students` | POST | 200/422 | Créer étudiant |
| `/api/students/:id` | PUT | 200/404/422 | Modifier étudiant |
| `/api/students/:id` | DELETE | 200/404 | Supprimer étudiant |

### Format des réponses erreur

**Validation échouée (422)** :
```json
{
  "success": false,
  "errors": {
    "email": "L'email est déjà utilisé",
    "password": "Le mot de passe est trop court"
  }
}
```

**Utilisateur non trouvé (404)** :
```json
{
  "success": false,
  "errors": {
    "email": "Utilisateur introuvable"
  }
}
```

---

## 📝 Notes de développement

### Points d'attention

1. **Token JWT** : Automatically added via axios interceptor sur chaque requête
2. **Navigation focus** : Les écrans se rafraîchissent quand ils reçoivent le focus (`navigation.addListener('focus', ...)`)
3. **SafeAreaView** : Obligatoire pour gérer les zones sécurisées sur iOS
4. **Image loading** : Fallback sur initiales si l'image échoue (géré dans AppAvatar)
5. **Phone entry** : Utilisation de `react-native-phone-entry` pour les numéros internationaux
6. **Gestion erreurs** : Utiliser le hook `useAuthError` pour toutes les erreurs API
7. **Mock errors** : Pour les réponses `success: false`, créer un fakeError avec le status approprié

### Débogage des erreurs

```javascript
// Logger les erreurs API dans apiHelpers.js
console.log("API Error:", error.response?.data || error.message);

// Dans useAuthError
console.log("🔍 API Error:", err);
```

### Améliorations futures possibles

- [ ] Mode hors-ligne complet avec cache React Query
- [ ] Notifications push
- [ ] Synchronisation multi-appareils
- [ ] Export des données (PDF/Excel)
- [ ] Graphiques avancés sur StatScreen (react-native-gifted-charts)
- [ ] Tests unitaires avec Jest
- [ ] Tests d'intégration avec Detox
- [ ] CI/CD avec GitHub Actions

---

## 📄 License

Ce projet est développé à des fins éducatives/démonstration.

---

**Document généré pour Studify v1.1**
**Dernière mise à jour : Janvier 2025**

