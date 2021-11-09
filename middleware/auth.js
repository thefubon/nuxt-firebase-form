import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SET_AUTH } from "~/store/types";

export default async ({ store, redirect }) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      const { isAuth } = store?.state?.auth;
      if (!user) {
        if (isAuth !== false) {
          store.commit(`auth/${SET_AUTH}`, false, { root: true });
        }
        redirect("/login");
      } else {
        if (isAuth !== true) {
          store.commit(`auth/${SET_AUTH}`, true, { root: true });
        }
      }
    });
  } catch (e) {
    // redirect({ name: "errors-400", params: { message: e } });
  }
};
