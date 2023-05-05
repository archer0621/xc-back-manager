<template>
    <a-sub-menu v-if="item.managementList" :key="item.managementList.id">
      <template #title>
        <component :is="item.icon"/>
        <span>
          {{ item.name }}
        </span>
      </template>
      <a-menu-item v-for="childen in item.managementList" :key="childen.id">
        <component :is="childen.icon"/>
        <span>
          {{ childen.name }}
          <router-link :to="childen.path" />
        </span>
      </a-menu-item>
    </a-sub-menu>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style></style>
