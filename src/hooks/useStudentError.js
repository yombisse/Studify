import { useState, useCallback } from "react";

export const useStudentError = () => {
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

  // Gérer automatiquement les erreurs API pour les étudiants
  const handleApiError = useCallback((err) => {
    const response = err.response;
    // if (__DEV__) { 
    //   console.log("🔍 Student API Error:", err); 
    // }

    // Erreur réseau (pas de réponse du serveur)
    if (!response) {
      setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
      return;
    }

    const status = response.status;
    const data = response.data;

    // Erreur 422 - Validation backend (champs dynamiques)
    if (status === 400 && data?.errors) {
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key]);
      });
      return;
    }

    // Erreur 400 - Bad Request
    if (status === 400) {
      if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key]);
        });
      } else if (data?.message) {
        setGeneralError(data.message);
      } else {
        setGeneralError("Requête invalide");
      }
      return;
    }

    // Erreur 401 - Non autorisé
    if (status === 401) {
      setGeneralError("Vous n'êtes pas autorisé à effectuer cette action");
      return;
    }

    // Erreur 403 - Accès interdit
    if (status === 403) {
      setGeneralError("Vous n'avez pas l'autorisation de modifier cette ressource");
      return;
    }

    // Erreur 404 - Non trouvé (étudiant)
    if (status === 404) {
      if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key]);
        });
      } else if (data?.message) {
        // Messages spécifiques pour les étudiants
        const msg = data.message.toLowerCase();
        if (msg.includes("étudiant") || msg.includes("etudiant") || msg.includes("student")) {
          setGeneralError("Étudiant non trouvé");
        } else if (msg.includes("id")) {
          setGeneralError("Ressource non trouvée");
        } else {
          setGeneralError(data.message);
        }
      } else {
        setGeneralError("Ressource non trouvée");
      }
      return;
    }

    // Erreur de suppression (peut être 409 Conflict ou 400)
    if (status === 409 || (status === 400 && data?.message?.toLowerCase().includes("supprim"))) {
      setGeneralError("Impossible de supprimer cet étudiant. Il est peut-être lié à d'autres données.");
      return;
    }

    // Erreur serveur (500+)
    if (status >= 500) {
      setGeneralError("Erreur serveur. Veuillez réessayer plus tard.");
      return;
    }

    // Erreur par défaut
    if (data?.message) {
      setGeneralError(data.message);
    } else if (data?.error) {
      setGeneralError(data.error);
    } else {
      setGeneralError("Une erreur est survenue lors de l'opération sur l'étudiant");
    }
  }, [setFieldError, setGeneralError]);

  // Méthode pour créer une erreur "business logic" (success: false)
  // Utilisé quand le backend retourne 200 avec {success: false, errors: {...}}
  const handleBusinessError = useCallback((responseData) => {
    console.log("🔍 Student Business Error:", responseData);

    if (responseData?.errors) {
      // Erreurs par champ (ex: {errors: {nom: "..."}})
      Object.keys(responseData.errors).forEach((key) => {
        setFieldError(key, responseData.errors[key]);
      });
    } else if (responseData?.message) {
      setGeneralError(responseData.message);
    } else {
      setGeneralError("Une erreur est survenue");
    }
  }, [setFieldError, setGeneralError]);

  // Message d'erreur personnalisé pour la suppression
  const getDeleteErrorMessage = useCallback((error) => {
    const msg = error?.response?.data?.message?.toLowerCase() || "";
    
    if (msg.includes("foreign") || msg.includes("contraint") || msg.includes("référence")) {
      return "Impossible de supprimer : cet étudiant est lié à d'autres données";
    }
    if (msg.includes("") || msg.includes("trouvé") || msg.includes("exist")) {
      return "Étudiant déjà supprimé ou non trouvé";
    }
    return "Impossible de supprimer cet étudiant";
  }, []);

  return {
    error,           
    setError,        
    clearError,    
    setFieldError,   
    setGeneralError, 
    handleApiError,  
    handleBusinessError, 
    getDeleteErrorMessage,
  };
};

export default useStudentError;

