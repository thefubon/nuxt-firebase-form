<template>
  <client-only>
    <div class="container mx-auto max-w-md px-4">
      <form @submit.prevent="login">
        <div class="my-3">
          <legend class="text-sm">Email</legend>
          <input
            id="email"
            v-model.trim="form.email"
            class="form-input px-4 py-3 rounded w-full"
            :class="$v.form.email.$error ? 'is-invalid' : ''"
            type="email"
            placeholder=""
          />
          <p
            v-if="$v.form.email.$dirty && !$v.form.email.required"
            class="invalid-feedback text-xs"
          >
            Обязательное поле!
          </p>
          <p
            v-if="$v.form.email.$dirty && !$v.form.email.email"
            class="invalid-feedback text-xs"
          >
            Электронная почта неверна!
          </p>
        </div>

        <div class="my-3">
          <legend class="text-sm">Пароль</legend>
          <input
            id="LastName"
            v-model.trim="form.password"
            class="form-input px-4 py-3 rounded w-full"
            :class="$v.form.password.$error ? 'is-invalid' : ''"
            type="password"
            placeholder=""
          />
          <p
            v-if="$v.form.password.$dirty && !$v.form.password.required"
            class="invalid-feedback text-xs"
          >
            Обязательное поле!
          </p>
        </div>

        <p v-if="error" class="invalid-feedback">{{ error }}</p>

        <div class="my-3">
          <button
            class="my-3 px-4 py-3 bg-indigo-500 text-white rounded d-flex align-items-center"
            type="submit"
            :disabled="loading"
          >
            <span class="me-2">Войти</span>
          </button>
        </div>
      </form>
    </div>
  </client-only>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  layout: "default",
  name: "LoginPage",
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      error: null,
      form: {
        email: null,
        // email: null,
        password: null
        // password: null
      }
    };
  },
  validations: {
    form: {
      password: { required },
      email: { required, email }
    }
  },
  methods: {
    async login() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        try {
          this.loading = true;
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.form.email, this.form.password)
            .then(async userCredential => {
              this.loading = false;
              this.$router.push("/admin/data");
            })
            .catch(error => {
              this.loading = false;
              const errorCode = error.code;
              const errorMessage = error.message;
              this.error = errorMessage;
              console.log("error login", errorCode, errorMessage);
            });
        } catch (e) {
          this.loading = false;
          console.log(e);
          this.error = "Ошибка при авторизации";
        }
      }
    }
  }
};
</script>

<style>
.is-invalid {
  @apply border-red-500;
}
.invalid-feedback {
  @apply text-red-500;
}
</style>
