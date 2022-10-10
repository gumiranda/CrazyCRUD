import { health } from "./health";
import { auth } from "./auth";
import { account } from "./account";
// IMPORT MODULE FILES
import { fakenews } from "./fakenews";
import { user } from "./user";
const routes = [
  health,
  auth,
  account,
  // ADD FUNCTION IMPORTS
fakenews,
  user,
];

export { routes };
