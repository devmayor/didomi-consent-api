import { Consent } from "src/enums";

/**
 * This function reformats an array of Consent into a 
 * an object that can be passed in a response
 */
export const formatConsents = (consents: Consent[], displayConsents) => {

    return displayConsents.map((consent) => {
      return {
        id: consent,
        enabled: consents.includes(consent),
      };
    });
  };
