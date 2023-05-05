<template>
  <div :id="uid" :style="myStyle"></div>
</template>
<script setup lang="ts">
import {ref, onBeforeMount, onMounted, watch, toRefs} from 'vue'
import * as echarts from 'echarts'
let uid = ref<string>('')
  const props = defineProps({
  myStyle: {
    type: Object,
    default: () => ({
      width: '800px',
      height: '400px',
    }),
  },
  myOption: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})


const propsT = toRefs(props).myOption

watch(propsT, (newValue, oldValue) => {
  renderCharts()
})


onBeforeMount(() => {
  uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`
})

const renderCharts = () => {
  let myChart = echarts.getInstanceByDom(document.getElementById(uid.value) as HTMLElement)
  
  if (myChart === undefined) {
    myChart = echarts.init(document.getElementById(uid.value) as HTMLElement)
  }
  myChart?.setOption(propsT.value, {
    notMerge: true,
  })
  window.addEventListener('resize', () => {
    setTimeout(() => {
      myChart?.resize({
        animation: {
          duration: 300,
        },
      })
    }, 300)
  })
}

onMounted(() => {
  renderCharts()
})


</script>









