<template>
  <div>
    <div> 一个测试页面123123 </div>
    <span>{{ romdom }}</span>
  </div>
</template>

<script setup lang="ts">
  function getRomdom() {
    return Math.floor(Math.random() * 1000)
  }
  const romdom = getRomdom()
</script>
