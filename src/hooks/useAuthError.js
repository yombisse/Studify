import { useState, useCallback } from "react";

export const useAuthError = () => {
  const [error, setError] = useState({});

  const clearError = useCallback((field = null) => {
    if (field) {
      setError((prev) => ({ ...prev, [field]: "" }));
    } else {
      setError({});
    }
  }, []);

  const setFieldError = useCallback((field, message) => {
    setError((prev) => ({
      ...prev,
      [field]: message,
      general: "",
    }));
  }, []);

  const setGeneralError = useCallback((message) => {
    setError((prev) => {
      const keys = Object.keys(prev);
      const cleared = keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
      return { ...cleared, general: message };
    });
  }, []);

  const handleBusinessError = useCallback((responseData) => {
    if (responseData?.errors) {
      Object.keys(responseData.errors).forEach((key) => {
        setFieldError(key, responseData.errors[key]);
      });
    } else if (responseData?.message) {
      setGeneralError(responseData.message);
    } else {
      setGeneralError("Une erreur est survenue");
    }
  }, [setFieldError, setGeneralError]);

  const handleApiError = useCallback((err) => {
    const response = err.response;

    if (!response) {
      setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
      return;
    }

    const status = response.status;
    const data = response.data;

    if ((status === 400 || status === 422) && data?.errors) {
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key]);
      });
      return;
    }

    if (status === 401) {
      const msg = data?.message || data?.error || err.message;
      const msgLower = (msg || "").toLowerCase();

      if (msgLower.includes("ancien")) {
        setFieldError("oldPassword", msg);
      } else if (msgLower.includes("nouveau")) {
        setFieldError("newPassword", msg);
      } else if (msgLower.includes("confirmation")) {
        setFieldError("confirmPassword", msg);
      } else if (
        msgLower.includes("password") ||
        msgLower.includes("mot de passe") ||
        msgLower.includes("motdepasse") ||
        msgLower.includes("incorrect") ||
        msgLower.includes("credentiel") ||
        msgLower.includes("échec") ||
        msgLower.includes("connexion") ||
        msgLower.includes("serveur")
      ) {
        setFieldError("password", msg);
      } else if (
        msgLower.includes("email") ||
        msgLower.includes("login") ||
        msgLower.includes("utilisateur")
      ) {
        setFieldError("email", msg);
      } else if (msgLower.includes("username") || msgLower.includes("nom_util")) {
        setFieldError("nom_utilisateur", msg);
      } else {
        setGeneralError(msg);
      }
      return;
    }

    if (status === 403) {
      setGeneralError("Vous n'avez pas l'autorisation d'effectuer cette action");
      return;
    }

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

    if (status >= 500) {
      setGeneralError("Erreur serveur. Veuillez réessayer plus tard.");
      return;
    }

    setGeneralError(data?.message || err.message || "Une erreur est survenue");
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

