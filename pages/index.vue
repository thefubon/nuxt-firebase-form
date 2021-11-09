<template>
  <div class="md:flex min-h-screen">
    <div class="md:w-1/2 bg-white">
      <div class="flex flex-col min-h-screen pb-8">
        <div class="flex-shrink-0 p-4">
          <img class="w-14" src="/alpari-logo.svg" alt="" />
        </div>
        <div class="flex-1 flex justify-center items-center px-4">
          <Form/>
        </div>
      </div>
    </div>
    <div class="flex-1 hidden md:flex justify-center items-center bg-[#9BD024]">
      <div class="min-w-0 max-w-[680px] space-y-4 p-4">
        <h1 class="text-[32px] leading-[36px] lg:text-[48px] lg:leading-[52px] font-bold">Заявка на 3-дневный курс с 50% скидкой.</h1>
        <h2 class="text-xl">Пополните торговый счет на $500 вместо $1000 и получите доступ к курсу.</h2>
        <img class="w-full" src="/finance.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default"
};
</script>
