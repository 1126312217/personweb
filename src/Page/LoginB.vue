<template>
  <div>
    <div class="box-ftg">
      <p v-drag style="width:100%;background:blue;height:50px;color:#fff;font-size:22px">title</p>
    </div>
    <div class="print-area">
      <img src="../assets/login2.png" alt="">
      <p>我撒旦·</p>
      <p>我撒旦·</p>
      <p>我撒旦·</p>
    </div>
    <button v-on:click="print">Print</button>
  </div>
</template>
<script>
export default {
  methods: {
    print() {
      const printArea = document.querySelector('.print-area')
      const content = printArea.innerHTML
    
      const w = window.open()
     setTimeout(() => {
        w.document.write(content)

        w.document.close()
        w.print()
        w.close()
      },50)
    }
  }
}
</script>
<style scoped>
.box-ftg {
  width: 300px;
  height: 300px;
  background: red;
  position: absolute;
}
</style>

