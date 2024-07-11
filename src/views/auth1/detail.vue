<template>
  <div>
    <div> 这是一个详细的页面 </div>
    <div>编号： {{ querySysNo }}</div>
    <div>随机数： {{ romdom }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const querySysNo = useRoute().query.sysno
  const romdom = Math.floor(Math.random() * 1000)
</script>
