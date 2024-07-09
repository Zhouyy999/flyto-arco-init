<template>
  <div>
    <div> 一个测试页面 </div>
    <a-button type="primary" @click="jumpDetail">跳转详细</a-button>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'

  const jumpDetail = () => {
    router.push('/auth1/detail')
  }
</script>
