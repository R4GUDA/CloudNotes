<template>

    <div class="content">

        <!-- menu -->
        <section class="menu">
            <div class="menu__group">
                <a href="#" class="group">Personal</a>
                <a href="#" class="group">Job</a>
                <input class="group__add" type="button" value="">
            </div>
        </section>

        <!-- notes -->
        <section class="notes">

            <!-- notes search -->
            <div class="notes__search">
                <input type="text">
            </div>

            <!-- notes cards -->
            <div class="notes__inner">
                <Note v-for="(note, id) in notes" :key="id" :data="note"></Note>
            </div>
        </section>
        </div>
</template>

<script>
import Note from '@/components/Note'
// import axios from 'axios'
export default {
  name: 'Home',
  components : {
    Note
  },
  async mounted() {
    // console.log(await axios.post('http://127.0.0.1:8000/api/login', {'login' : '12', 'password' : '123'}))
  },
  data : () => ({
    notes : [{
      title : 123,
      text : 321
    },{
      title : 456,
      text : 654
    }]
  })
};
</script>
