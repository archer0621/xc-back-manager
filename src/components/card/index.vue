<template>
  <a-card :title="ratio.title" :bordered="false" style="max-height: 505px; overflow: auto">
    <a-statistic :title="ratio.flag ? '增长' : '下降'" :value="ratio.rate" :precision="2" suffix="%" :value-style="{ color: ratio.color }" style="margin-right: 50px">
      <template #prefix>
        <arrow-up-outlined v-if="ratio.flag" />
        <arrow-down-outlined v-else />
      </template>
    </a-statistic>
  </a-card>
</template>

<script setup lang="ts">
const props = defineProps({
  ratio: {
    type: Object,
    required: true
  }
})
</script>
