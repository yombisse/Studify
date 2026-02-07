import { useState, useCallback } from "react";

/**
 * Hook simple et flexible pour gérer les erreurs de formulaire
 * - Pas de mapping requis - les clés backend deviennent directement les clés frontend
 * - Extensible - ajouter autant de champs que vous voulez
 * - Dynamique - pas besoin de modifier le hook quand le backend change
 */
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
      general: "", // effacer erreur générale quand un champ a une erreur
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
    console.log("🔍 API Error:", err);

    // Erreur réseau (pas de réponse du serveur)
    if (!response) {
      setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
      return;
    }

    const status = response.status;
    const data = response.data;

    // Erreur 422 - Validation backend (clés dynamiques avec ...)
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

      // Analyser le message pour trouver le champ
      if (msgLower.includes("password") || msgLower.includes("mot de passe")) {
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

    // Erreur 404 - Non trouvé
    if (status === 404) {
      // Vérifier s'il y a des erreurs par champ (ex: {errors: {email: "..."}})
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

    // Erreur par défaut
    setGeneralError(data?.message || err.message || "Une erreur est survenue");
  }, [setFieldError, setGeneralError]);

  return {
    error,
    setError,
    clearError,
    setFieldError,
    setGeneralError,
    handleApiError,
  };
};

export default useAuthError;

