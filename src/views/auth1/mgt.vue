<template>
  <div>
    <div> 一个测试页面 </div>
    <a-button type="primary" @click="jumpDetail">跳转详细</a-button>
    <span>{{ romdom }}</span>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function getRomdom() {
    return Math.floor(Math.random() * 1000)
  }
  const romdom = getRomdom()

  const jumpDetail = () => {
    router.push(`/auth1/detail/${getRomdom()}`)
  }
</script>
