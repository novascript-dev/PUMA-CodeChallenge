<template>
  <div id="app" class="p-6 bg-gray-100 min-h-screen min-w-[700px] flex flex-col items-center">
    <h1 class="text-3xl font-bold text-center mb-4">Usuários Favoritos do GitHub</h1>
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <AddUserForm
        :loading="loading"
        @add-favorite="addFavorite"
      />
      <div class="flex justify-between items-center mb-4">
        <UserList
          :favorites="favorites"
          :loading="loading"
          :remove-favorite="removeFavorite"
          @update-favorites="updateFavorites"
          @update-loading="setLoading"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <Loader v-if="loading" />
        <button @click="sortUsers" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Ordenar Alfabeticamente
        </button>
      </div>
    </div>
    <ErrorModal
      :message="errorMessage"
      :visible="errorMessage !== ''"
      @close="errorMessage = ''"
    />
  </div>
</template>

<script>
import AddUserForm from './components/AddUserForm.vue';
import UserList from './components/UserList.vue';
import Loader from './components/Loader.vue';
import ErrorModal from './components/ErrorModal.vue';

import { getUsers, addUser, deleteUser } from './services/usersService.js';

export default {
  components: {
    AddUserForm,
    UserList,
    Loader,
    ErrorModal,
  },
  data() {
    return {
      favorites: [],
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    setLoading(isLoading) {
      this.loading = isLoading;
    },
    async fetchUsers(sort = '') {
      this.loading = true;
      try {
        this.favorites = await getUsers(sort);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
    async sortUsers() {
      this.fetchUsers('asc');
    },
    async addFavorite(username) {
      this.loading = true;
      try {
        const newUser = await addUser(username);
        this.favorites.push(newUser);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
    async removeFavorite(username) {
      this.loading = true;
      try {
        const response = await deleteUser(username);
        this.favorites = this.favorites.filter(user => user.username !== username);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
    updateFavorites(updatedUser) {
      this.favorites = this.favorites.map(user =>
        user.username === updatedUser.username
          ? { ...user, starred: !user.starred }
          : { ...user, starred: false }
      );
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script> 