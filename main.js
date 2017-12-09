var brandColors = {
  magentaLight: 0xFF0066,
  magentaDark: 0xB21252,
  blueLight: 0x14ACCC,
  blueDark: 0x0995B2,
  brightYellow: 0xFFE919
}

var data = {
  triangles: [
    { rotation: 0, height: 200, width: 300, tip: .2}
  ]
};

Vue.component('my-triangle',{
  props: ['tri'],
  template: '<div class="triangle" v-bind:style="triStyle"></div>',
  data: function(){
    return {
      animatedTip: this.tri.tip
    }
  },
  watch: {
    'tri.tip': function(newValue, oldValue){
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedTip = this.tweeningNumber;
        })
        .start()

      animate()
    }
  },
  computed: {
    triStyle: function(){
      var left = this.tri.width * this.animatedTip;
      var right = this.tri.width - left;
      return {
        borderWidth:
          '0px '
          + right + 'px '
          + this.tri.height + 'px '
          + left + 'px'
      }
    }
  }
})

Vue.component('my-graphic',{
  props: ['triangles'],
  template: '<div><my-triangle v-for="(triangle, index) in triangles" v-bind:tri="triangle" v-bind:key="index"></my-triangle></div>'
})

var app = new Vue({
  el: "#app",
  data,
  template:'<my-graphic v-bind:triangles="triangles"></my-graphic>'
})

setInterval(
  function(){
    data.triangles[0].tip = Math.random();
  },
  1000
)
