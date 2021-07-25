<template>

  <Header></Header>

  <router-view></router-view>

</template>

<style>
@import url(./assets/css/style.css);
</style>

<script>
import Header from "@/components/Header"
export default {
  components : {
    Header
  }
}
</script>