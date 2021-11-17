<template>
  <div class="about">
    <h1>This is an about page 111</h1>
    <div class="row" v-for="item in WeatherForecast" :key="item.date">
      <div>{{item.date}}</div>
      <div>{{item.TemperatureC}}</div>
      <div>{{item.Summary}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      WeatherForecast: []
    }
  },
  mounted () {
    const self = this
    this.$nextTick(function () {
      window.jQuery.ajax({
        method: 'get',
        url: '/WeatherForecast',
        success: function (result) {
          for (var i = 0; i < result.length; i++) {
            self.WeatherForecast.push(result[i])
          }

          console.log(self.WeatherForecast)
          console.log(result)
        }
      })
    })
  }
}
</script>
