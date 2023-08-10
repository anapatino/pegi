import jwt_decode from "jwt-decode";

export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const personDocument = JSON.parse(localStorage.getItem("personDocument"));
  const decoded = jwt_decode(token);
  let user = {};

  if (decoded.hasOwnProperty("Document")) {
    user = getPerson(decoded);
  } else {
    user = generateUser(decoded);
    user.personDocument = personDocument;
  }
  return user;
};

const getPerson = (decoded) => {
  for (let prop in decoded) {
    if (
      prop === "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ) {
      decoded.role = decoded[prop];
    }
    if (prop === "Document") {
      decoded.personDocument = decoded[prop];
      delete decoded.Document;
    }
    if (
      prop ===
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ) {
      decoded.nameUser = decoded[prop];
    }
  }
  return decoded;
};

const generateUser = (decoded) => {
  let user = {};

  for (let prop in decoded) {
    if (
      prop === "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ) {
      user.role = decoded[prop];
    }
    if (
      prop ===
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ) {
      user.nameUser = decoded[prop];
    }
  }
  return user;
};
