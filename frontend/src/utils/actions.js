import { redirect } from "react-router-dom";

export const logoutAction = () => {
  localStorage.removeItem("authToken");
  return redirect("/");
};
