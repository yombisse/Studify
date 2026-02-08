import { useState, useCallback } from "react";

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
    setError((prev) => {
      const keys = Object.keys(prev);
      const cleared = keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
      return { ...cleared, general: message };
    });
  }, []);

  const handleApiError = useCallback((err) => {
  const response = err.response;

  // Pas de réponse du serveur
  if (!response) {
    console.log("🔑 Auth API Error: Pas de réponse du serveur", err.message);
    setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
    return;
  }

  const status = response.status;
  const data = response.data;
  console.log("🔍 Auth API Response:", { status, data });

  // ✅ Cas spécial pour 401
  if (status === 401) {
    if (data?.errors) {
      // Mapper chaque champ
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key]);
        console.log(`🔑 401 Error mappée sur ${key}:`, data.errors[key]);
      });
    } else if (data?.message) {
      // Message général
      setGeneralError(data.message);
      console.log("🔑 401 Message général:", data.message);
    } else {
      setGeneralError("Identifiants incorrects");
      console.log("🔑 401 Erreur par défaut: Identifiants incorrects");
    }
    return; // Très important pour ne pas passer au reste
  }

  // Autres erreurs avec champ
  if (data?.errors) {
    Object.keys(data.errors).forEach((key) => {
      setFieldError(key, data.errors[key]);
      console.log(`🔑 Erreur mappée sur ${key}:`, data.errors[key]);
    });
    return;
  }

  // Message général
  if (data?.message) {
    setGeneralError(data.message);
    console.log("🔑 Message général:", data.message);
    return;
  }

  // Cas par défaut
  setGeneralError(err.message || "Une erreur est survenue");
  console.log("🔑 Erreur par défaut:", err.message);
}, [setFieldError, setGeneralError]);

  // Gestion des erreurs "business logic" renvoyées par le backend
  const handleBusinessError = useCallback((responseData) => {
    console.log("🔍 Business Error brute:", responseData);

    if (responseData?.errors) {
      Object.keys(responseData.errors).forEach((key) => {
        const msg = responseData.errors[key];

        // Log détaillé pour chaque champ
        console.log(`🔑 Business Error mappée sur ${key}:`, msg);

        // Set l'erreur pour le champ
        setFieldError(key, msg);
      });
    } else if (responseData?.message) {
      setGeneralError(responseData.message);
      console.log("🔑 Business Message général:", responseData.message);
    } else {
      setGeneralError("Une erreur est survenue");
      console.log("🔑 Business Erreur par défaut");
    }
  }, [setFieldError, setGeneralError]);

  return {
    error,
    setError,
    clearError,
    setFieldError,
    setGeneralError,
    handleApiError,
    handleBusinessError,
  };
};

export default useAuthError;
