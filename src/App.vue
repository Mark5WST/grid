<script setup>
import GridTable2 from './components/GridTable2.vue'
</script>

<template>
  <div class="h-full drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col bg-gray-50">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300"></div>
      <!-- Page content here -->
      <div class="p-6 space-y-4">

        <!-- <GridTable :edit-mode="editMode" :data="data" /> -->
        <GridTable2 />
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-48 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->

      </ul>
    </div>
  </div>
</template>

<style scoped></style>
