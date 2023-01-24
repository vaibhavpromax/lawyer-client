import { ROLES } from "../constants/roles";
import { CLIENT_ROUTES } from "./role-routes/client";
import { LAWYER_ROUTES } from "./role-routes/lawyer";

export const ROLE_ROUTES = {
  [ROLES.LAWYER]: LAWYER_ROUTES,
  [ROLES.CLIENT]: CLIENT_ROUTES,
};
