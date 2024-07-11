<template>
  <div style="height: 2000px">
    <div> 一个测试页面 </div>
    <a-button type="primary" @click="jumpDetail">跳转详细</a-button>
    <span>{{ romdom }}</span>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'

  function getRomdom() {
    return Math.floor(Math.random() * 1000)
  }
  const romdom = getRomdom()

  const jumpDetail = () => {
    router.push(`/auth1/detail?sysno=${getRomdom()}`)
  }
</script>
