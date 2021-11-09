<template>
  <div>
    <client-only>
      <Nuxt />
    </client-only>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapState } from "vuex";
import { SET_AUTH } from "~/store/types";
export default {
  computed: {
    ...mapState({
      isAuth: state => state?.auth?.isAuth
    })
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$store.commit(`auth/${SET_AUTH}`, false, { root: true });
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
.container-fluid {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.navbar-nav {
  display: flex;
  flex-flow: row nowrap;
}

.nav-item {
  margin: 12px;
}

.nav-link {
  padding: 10px;
}

.nav-link.active {
  font-weight: bold;
}

.b1 {
  border: 1px solid red;
}

.b2 {
  border: 1px solid yellow;
}
</style>
