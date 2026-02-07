import { useState, useCallback } from "react";

/**
 * Hook personnalisé pour gérer les erreurs des opérations sur les étudiants
 * - Gère les erreurs de validation (422)
 * - Gère les erreurs de suppression (404/400)
 * - Gère les erreurs de création/modification
 * -Messages d'erreur spécifiques au contexte étudiant
 */
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
    console.log("🔍 Student API Error:", err);

    // Erreur réseau (pas de réponse du serveur)
    if (!response) {
      setGeneralError("Connexion impossible. Vérifiez votre connexion internet.");
      return;
    }

    const status = response.status;
    const data = response.data;

    // Erreur 422 - Validation backend (champs dynamiques)
    if (status === 422 && data?.errors) {
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

    // Erreur 404 - Non trouvé (étudiant不存在)
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
    if (msg.includes("不存在") || msg.includes("trouvé") || msg.includes("exist")) {
      return "Étudiant déjà supprimé ou non trouvé";
    }
    return "Impossible de supprimer cet étudiant";
  }, []);

  return {
    error,           // { email: "...", nom: "...", general: "..." }
    setError,        // Fonction pour définir manuellement les erreurs
    clearError,      // Fonction pour effacer les erreurs
    setFieldError,   // Fonction pour définir une erreur de champ
    setGeneralError, // Fonction pour définir une erreur générale
    handleApiError,  // Fonction pour gérer les erreurs HTTP axios
    handleBusinessError, // Fonction pour gérer les erreurs business (success: false)
    getDeleteErrorMessage, // Fonction pour messages de suppression
  };
};

export default useStudentError;

/*
╔══════════════════════════════════════════════════════════════════╗
║                    EXEMPLE D'UTILISATION                          ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  import useStudentError from '../hooks/useStudentError';          ║
║                                                                  ║
║  const StudentForm = ({ student, onSave }) => {                  ║
║    const { error, clearError, setFieldError, handleApiError,     ║
║            handleBusinessError } = useStudentError();            ║
║                                                                  ║
║    const handleSubmit = async () => {                            ║
║      clearError();                                               ║
║                                                                  ║
║      // Validation locale                                        ║
║      if (!nom) {                                                 ║
║        setFieldError('nom', 'Le nom est requis');                ║
║        return;                                                   ║
║      }                                                           ║
║                                                                  ║
║      try {                                                       ║
║        const response = await createStudent(data);              ║
║        if (response.success) {                                   ║
║          onSave();                                               ║
║        } else {                                                  ║
║          // Erreur business logic (success: false)               ║
║          handleBusinessError(response);                          ║
║        }                                                         ║
║      } catch (err) {                                             ║
║        // Erreur HTTP (422, 404, 500...)                          ║
║        handleApiError(err);                                      ║
║      }                                                           ║
║    };                                                           ║
║                                                                  ║
║    return (                                                      ║
║      <>                                                         ║
║        <FormInput error={error.nom} />                          ║
║        <FormInput error={error.email} />                         ║
║        <AppText text={error.general} style={{color: 'red'}} />  ║
║      </>                                                         ║
║    );                                                           ║
║  };                                                             ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
*/

