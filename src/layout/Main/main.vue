<template>
  <div class="main-container">
    <a-row>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.finaceRatio"/>
      </a-col>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.mediaRatio"/>
      </a-col>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.courseRatio"/>
      </a-col>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.publishRatio"/>
      </a-col>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.teacherRatio"/>
      </a-col>
      <a-col :span="4">
        <a-skeleton v-if="loading" active />
        <Card v-else :ratio="ratio.orderRatio"/>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="20">
        <a-card title="年收入" :bordered="false" style="width: 100%; min-height: 322px;">
          <a-spin v-if="loading" size="large" tip="玩儿命加载中······" style="margin: 60px 0 0 50%"/>
          <my-echarts v-else :myOption="lineOption" :myStyle="lineStyle" />
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-calendar :fullscreen="false" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="6">
        <a-card title="课程分类" :bordered="false" class="echart-card">
          <a-spin v-if="loading" size="large" tip="玩儿命加载中······"/>
          <my-echarts v-else :myOption="pieOption" :myStyle="pieStyle" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="公司营收" :bordered="false" class="echart-card">
          <a-spin v-if="loading" size="large" tip="玩儿命加载中······"/>
          <my-echarts v-else :myOption="barOption" :myStyle="barStyle"/>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="建站时间轴" :bordered="false" class="echart-card timeAxis" >
          <a-spin v-if="loading" size="large" tip="玩儿命加载中······"/>
          <a-timeline v-else mode="alternate">
            <a-timeline-item v-for="(log, idx) in timeLog.timeList" :key="idx" :color="idx % 2 === 0 ? 'blue' : 'green'">
              {{ log.createTime }}
              {{ log.description }}
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import MyEcharts from '@/components/echarts/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { getBarInfo, getLineInfo, getPieInfo, getTimeLog, getFinanceRatio, getMediaRatio, getCourseRatio, getPublishRatio, getTeacherRatio, getOrderRatio } from '@/service/index'
import { lineData, pieData, barData, userData } from '@/components/echarts/options'
import { timeLogType, ratioType } from '@/api/system/charts/type'
import Card from '@/components/card/index.vue'

// 加载主页相关图表信息资源
const barOption = ref({})
const lineOption = ref({})
const pieOption = ref({})
const timeLog = reactive({
  timeList: [] as timeLogType[],
})
const ratio = reactive({
  finaceRatio: {} as ratioType,
  mediaRatio: {} as ratioType,
  courseRatio: {} as ratioType,
  publishRatio: {} as ratioType,
  teacherRatio: {} as ratioType,
  orderRatio: {} as ratioType,
})
// 数据未加载完毕时使用骨架屏和loading效果
const loading = ref<boolean>(true)
const getList = async () => {
  // 获取折线图信息
  await getLineInfo().then((res: any) => {
    let xAxisData = res.data.data.map((item) => {
      return item.date
    })
    let seriesData = res.data.data.map((item) => {
      return item.money
    })
    lineOption.value = lineData(xAxisData, seriesData)
  })
  // 获取柱状图信息
  await getBarInfo().then((res: any) => {
    let xAxisData = res.data.data.map((item) => {
      return item.date
    })
    let seriesData = res.data.data.map((item) => {
      return item.totalMoney
    })
    barOption.value = barData(xAxisData, seriesData)
  })
  
  // 获取饼状图信息
  await getPieInfo().then((res: any) => {
    res = res.data.data.map((item) => ({
      value: item.count,
      name: item.name,
    }))
    pieOption.value = pieData(res)
  })
  // 获取时间轴信息
  await getTimeLog().then((res: any) => {
    timeLog.timeList = res.data.data.map((item) => ({
      description: item.description,
      createTime: item.createTime.substring(0, 10),
    }))
  })
  // 获取首行的6个卡片内容增长率
  await getFinanceRatio().then((res: any) => {
    ratio.finaceRatio = res.data.data
    ratio.finaceRatio.title = '收入额同比上月数据'
    if (res.data.data.flag) {
      ratio.finaceRatio.color = '#3f8600'
    } else {
      ratio.finaceRatio.color = '#cf1322'
    }
  })
  await getMediaRatio().then((res: any) => {
    ratio.mediaRatio = res.data.data
    ratio.mediaRatio.title = '媒介资源同比去年数据'
    if (res.data.data.flag) {
      ratio.mediaRatio.color = '#3f8600'
    } else {
      ratio.mediaRatio.color = '#cf1322'
    }
  })
  await getCourseRatio().then((res: any) => {
    ratio.courseRatio = res.data.data
    ratio.courseRatio.title = '课程量同比去年数据'
    if (res.data.data.flag) {
      ratio.courseRatio.color = '#3f8600'
    } else {
      ratio.courseRatio.color = '#cf1322'
    }
  })
  await getPublishRatio().then((res: any) => {
    ratio.publishRatio = res.data.data
    ratio.publishRatio.title = '课程发布量同比去年数据'
    if (res.data.data.flag) {
      ratio.publishRatio.color = '#3f8600'
    } else {
      ratio.publishRatio.color = '#cf1322'
    }
  })
  await getTeacherRatio().then((res: any) => {
    ratio.teacherRatio = res.data.data
    ratio.teacherRatio.title = '教师人数同比去年数据'
    if (res.data.data.flag) {
      ratio.teacherRatio.color = '#3f8600'
    } else {
      ratio.teacherRatio.color = '#cf1322'
    }
  })
  await getOrderRatio().then((res: any) => {
    ratio.orderRatio = res.data.data
    ratio.orderRatio.title = '订单年增量数据'
    if (res.data.data.flag) {
      ratio.orderRatio.color = '#3f8600'
    } else {
      ratio.orderRatio.color = '#cf1322'
    }
  })
  // 实现数据全部加载完毕后展示
  loading.value = !loading.value
}

const lineStyle = {
  height: '216px',
}

const pieStyle = {
  height: '400px',
}

const barStyle = {
  height: '400px',
}

onMounted(() => {
  getList()
})
</script>
<style lang="less">
.ant-layout {
  min-height: 100%;
  overflow: auto;
}
.main-container {
  height: 100vh;
  .ant-row {
    .ant-col {
      .echart-card {
        .ant-spin {
          margin-top: 150px;
        }
        text-align: center;
        height: 505px;
        overflow: hidden auto;
      }
      padding: 5px;
      .ant-skeleton-title {
        height: 20px;
      }
      .ant-skeleton-paragraph > li{
        height: 20px;
      } 
    }
  }
  .timeAxis {
    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }
  }
}
.ant-layout-content {
  height: 91vh;
  overflow: hidden auto;
  &::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
}
</style>
