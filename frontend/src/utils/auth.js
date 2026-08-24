export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem("relay_session"));
  } catch {
    return null;
  }
};

export const setSession = (s) => localStorage.setItem("relay_session", JSON.stringify(s));

export const clearSession = () => localStorage.removeItem("relay_session");
