export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem("relay_session"));
  } catch {
    return null;
  }
};

export const setSession = (s) => localStorage.setItem("relay_session", JSON.stringify(s));

export const clearSession = () => localStorage.removeItem("relay_session");

export const getVehicle = () => {
  try {
    return JSON.parse(localStorage.getItem("relay_vehicle"));
  } catch {
    return null;
  }
};

export const setVehicle = (v) => localStorage.setItem("relay_vehicle", JSON.stringify(v));

export const clearVehicle = () => localStorage.removeItem("relay_vehicle");
