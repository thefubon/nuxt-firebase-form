<template>
  <div class="md:w-[480px]">
    <form v-if="!registrationPassed" @submit.prevent="checkForm" class="space-y-8">

      <div class="md:hidden space-y-4 p-4 rounded bg-[#9BD024] mb-8">
        <img class="w-full" src="/finance.svg" alt="" />
        <h1 class="text-[32px] leading-[36px] font-bold">Заявка на 3-дневный курс с 50% скидкой.</h1>
        <h2 class="text-lg">Пополните торговый счет на $500 вместо $1000 и получите доступ к курсу.</h2>
      </div>

      <div class="md:relative">
        <legend class="text-sm mb-2 text-[#616262]">Имя:</legend>
        <input
          id="firstName"
          v-model.trim="form.firstName"
          class="form-control p-4 bg-white placeholder-[#E0E0E0] text-gray-900 rounded border border-[#E0E0E0] appearance-none w-full block focus:outline-none"
          :class="$v.form.firstName.$error ? 'is-invalid' : ''"
          type="text"
        />
        <p v-if="$v.form.firstName.$dirty && !$v.form.firstName.required" class="invalid-feedback text-xs md:absolute md:-bottom-4 md:left-0">Поле обязательно для заполнения.</p>
        <p v-if="$v.form.firstName.$dirty && !$v.form.firstName.minLength" class="invalid-feedback text-xs absolute -bottom-4 left-0">Должно быть более 3 символов!</p>
      </div>

      <div class="md:relative">
        <legend class="text-sm mb-2 text-[#616262]">Номер Личного Кабинета:</legend>
        <input
          id="PersonalNumber"
          v-model.trim="form.PersonalNumber"
          class="p-4 bg-white placeholder-[#E0E0E0] text-gray-900 rounded border border-[#E0E0E0] appearance-none w-full block focus:outline-none"
          :class="$v.form.PersonalNumber.$error ? 'is-invalid' : ''"
          type="text"
        />
        <p v-if="$v.form.PersonalNumber.$dirty && !$v.form.PersonalNumber.required" class="invalid-feedback text-xs md:absolute md:-bottom-4 md:left-0">Поле обязательно для заполнения.</p>
        <p v-if="$v.form.PersonalNumber.$dirty && !$v.form.PersonalNumber.minLength" class="invalid-feedback text-xs md:absolute md:-bottom-4 md:left-0">Должно быть более 3 символов!</p>
      </div>

      <div class="md:relative">
        <div class="flex items-top space-x-4">
          <div class="flex-auto w-full">
            <legend class="text-sm mb-2 text-[#616262]">Номер телефона:</legend>
            <input
              id="phone"
              v-model.trim="form.phone"
              :class="$v.form.phone.$error ? 'is-invalid' : ''"
              class="p-4 bg-white placeholder-[#E0E0E0] text-gray-900 rounded border border-[#E0E0E0] appearance-none w-full block focus:outline-none"
              type="tel"
              placeholder="+7 (000) 000-00-00"
            />
            <p v-if="$v.form.phone.$dirty && !$v.form.phone.required" class="invalid-feedback text-xs md:absolute md:-bottom-4 md:left-0">Поле обязательно для заполнения.</p>
          </div>
        </div>
      </div>

      <div class="md:relative">
        <div class="flex space-x-2">
          <input
            id="checkbox"
            v-model.trim="form.checkbox"
            :class="$v.form.checkbox.$error ? 'is-invalid' : ''"
            class="form-checkbox rounded border border-[#E0E0E0] appearance-none p-3 placeholder-[#E0E0E0] text-[#9BD024] focus:outline-none focus:ring-white"
            type="checkbox"
          />
          <label class="text-sm text-[#616262]" for="checkbox">Нажимая кнопку "Отправить" вы соглашаетесь согласие на обработку персональных данных</label>
        </div>
        <p v-if="$v.form.checkbox.$dirty && !$v.form.checkbox.mustBeTrue" class="invalid-feedback text-xs md:absolute md:-bottom-4 md:left-0">Поле обязательно для заполнения.</p>
      </div>

      <input name="utmSource" type="hidden" id="form-input-utmSource" />
      <input name="utmMedium" type="hidden" id="form-input-utmMedium" />
      <input name="utmTerm" type="hidden" id="form-input-utmTerm" />
      <input name="utmContent" type="hidden" id="form-input-utmContent" />
      <input name="utmCampaign" type="hidden" id="form-input-utmCampaign" />

      <input name="date" type="hidden" id="dataReg" />

      <div class="my-6">
        <button
          type="submit"
          :disabled="loading"
          class="visually-hidden flex items-center text-center text-md px-8 h-14 bg-[#78C332] hover:bg-[#7AB72F] font-semibold text-white uppercase rounded shadow-md"
        >
          <div v-if="loading" role="status">
            <svg
              class="visually-hidden Registration animate-spin mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div>Отправить</div>
        </button>
      </div>
    </form>
    <div v-else>
      <h1 class="text-2xl font-bold">
        {{ `${form.firstName}, поздравляем вы успешно зарегистрированы!` }}
      </h1>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { db } from "~/plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { req } from "vuelidate/lib/validators/common";

export default {
  mixins: [validationMixin],
  data() {
    return {
      query: null,
      loading: false,
      registrationPassed: false,
      form: {
        firstName: "",
        PersonalNumber: "",
        phone: "",
        checkbox: false
      },
    };
  },
  validations: {
    form: {
      firstName: { required, minLength: minLength(3) },
      PersonalNumber: { required, minLength: minLength(3) },
      phone: { required },
      checkbox: {
        mustBeTrue(value) {
          return value;
        }
      }
    }
  },
  mounted() {
    const queryKeys = Object.keys(this.$route?.query);
    if (queryKeys && queryKeys.length) {
      this.query = this.$route?.query;
    }
  },
  methods: {
    async checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        try {
          this.loading = true;
          let request = this.form;
          if (this.query) {
            request = {
              ...request,
              ...this.query
            };
          }
          await setDoc(doc(db, "users", Date.now().toString()), request);
          this.loading = false;
          this.registrationPassed = true;
        } catch (e) {
          this.loading = false;
          console.log(e);
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

.form-tick:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
}
</style>
