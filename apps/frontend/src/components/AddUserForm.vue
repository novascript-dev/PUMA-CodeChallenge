<template>
    <div class="flex justify-center mb-4">
      <input
        type="text"
        v-model="username"
        placeholder="Digite o username do GitHub"
        class="border rounded p-2 w-full"
        :disabled="loading"
        @keyup.enter="addFavorite"
      />
      <button
        @click="addFavorite"
        class="bg-blue-500 text-white rounded py-2 px-10 ml-2"
        :disabled="loading"
      >
        Adicionar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loading: Boolean,
    },
    data() {
      return {
        username: '',
      };
    },
    methods: {
      async addFavorite() {
        if (!this.username) return;
        await this.$emit('add-favorite', this.username);
        this.username = '';
      },
    },
  };
  </script>
  