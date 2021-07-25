<template>

    <div class="note">
        <div class="note__top">
            <input class="note__title" :value="data.title" placeholder="Title" type="text">
            <button class="note__close"><img alt="cross" src="@/assets/imgs/sections/note__close.png" class="note__close-img"></button>
        </div>
        <textarea placeholder="Content" v-model="text" class="note__content" cols="30" rows="10"></textarea>
    </div>

</template>

<style>
    
</style>

<script>
export default {
  name: 'Note',
  props: [
      'data'
  ],
  computed: {
    text() {
      return this.data.text
    }
  }
}
</script>