<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 class="text-lg font-bold mb-4">Erro</h2>
        <p>{{ message }}</p>
        <div class="flex justify-end mt-4">
          <button @click="close" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Fechar</button>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>
  