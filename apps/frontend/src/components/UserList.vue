<template>
  <div class="grid grid-cols-3 gap-4 mx-auto">
    <div
      class="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-xl"
      v-for="user in favorites"
      :key="user.username"
    >
      <img
        :src="user.avatar"
        alt="Foto de perfil"
        class="w-24 h-24 rounded-full mx-auto mb-2"
      />
      <h2 class="text-xl font-semibold text-center">{{ user.name }}</h2>
      <p class="text-gray-600 text-center">{{ user.username }}</p>
      <a
        :href="user.html_url"
        target="_blank"
        class="text-blue-500 hover:underline text-center block mt-2"
      >
        Ver no GitHub
      </a>
      <div class="flex justify-between mt-4">
        <button
          @click="removeFavorite(user.username)"
          class="text-red-500"
          :disabled="loading"
        >
          Excluir
        </button>
        <button
          @click="toggleStar(user)"
          class="text-yellow-500"
          :disabled="loading"
        >
          <span v-if="user.starred">★</span>
          <span v-else>☆</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favorites: Array,
    loading: Boolean,
    removeFavorite: Function,
  },
  methods: {
    async toggleStar(user) {
      this.$emit('update-loading', true);
      try {
        const currentlyStarred = this.favorites.find(u => u.starred);
        if (currentlyStarred && currentlyStarred.username !== user.username) {
          await this.toggleStarredUser(currentlyStarred.username);
        }
        const updatedUser = await this.toggleStarredUser(user.username);
        this.$emit('update-favorites', updatedUser);
      } catch (error) {
        alert(error.message);
      } finally {
        this.$emit('update-loading', false);
      }
    },
    async toggleStarredUser(username) {
      const response = await fetch(`http://127.0.0.1:3000/users/${username}/toggle-star`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      return data.user;
    },
  },
};
</script>
