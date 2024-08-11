import * as Yup from "yup";

export const PasswordValidation = {
  newpassword_1: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Nouveau mot de passe est obligatoire"),
  newpassword_2: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .oneOf(
      [Yup.ref("newpassword_1"), null],
      "Les nouveaux mots de passe ne correspondent pas"
    )
    .required("Confirmer le nouveau mot de passe"),
};

export const UserValidation = {
  first_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Prénom est obligatoire."),
  last_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Nom est obligatoire."),
  name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Nom affiché est obligatoire"),
  email: Yup.string()
    .email("Email invalide")
    .required("Email est obligatoire. "),
};

export const ShippingAdressValidation = {
  first_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Prénom est obligatoire."),
  last_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Nom est obligatoire."),
  address_1: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Adresse est obligatoire."),
  city: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Ville est obligatoire."),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Le numéro de téléphone n'est pas valide "
    )
    .required("Numéro de téléphone est obligatoire."),
};

export const BillingAdressValidation = {
  ...ShippingAdressValidation,
  email: Yup.string()
    .email("Email invalide")
    .required("Email est obligatoire. "),
};

export const EmailValidator = {
  email: Yup.string()
    .email("Email invalide")
    .required("Email est obligatoire. "),
};

export const LoginValidation = Yup.object().shape({
  username: Yup.string()
    .email("Email invalide")
    .required("Email est obligatoire. "),
  password: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Password est obligatoire. "),
});

export const LoggedInReviewValidation = {
  review: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(200, "Valeur Trop Long !")
    .required("Avis est obligatoire."),
  rate: Yup.string().required("Note est obligatoire."),
};

export const LoggedOutReviewValidation = {
  reviewer: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(200, "Valeur Trop Long !")
    .required("Nom est obligatoire."),
  review: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Avis est obligatoire."),
  rate: Yup.string().required("Note est obligatoire."),
  email: Yup.string()
    .email("Email invalide")
    .required("Email est obligatoire. "),
};
