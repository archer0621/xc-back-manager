<template>
  <h1>{{ hello }}</h1>

</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { testGet } from '@/service/index'
export default defineComponent({
  setup() {
    const hello = ref('');
    testGet().then((res:any) => {
      hello.value = res.data;
    })
    return {
      hello
    }
  }

})

</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
