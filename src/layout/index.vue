<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <a-layout>
      <NavBar />
      <a-layout-content style="margin: 0 16px">
        <Breadcrumb />
        <Main />
      </a-layout-content>
      <Footer />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Sidebar from '@/layout/Sidebar/index.vue'
import NavBar from './NavBar/index.vue'
import Breadcrumb from './Main/breadcrumb.vue'
import Main from './Main/index.vue'
import Footer from './Footer/index.vue'
import { ref, provide } from 'vue'
const collapsed = ref<boolean>(false)
provide('collapsed', collapsed)
</script>
