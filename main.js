
var Vue = require('vue')

var ProductList = require('./component/ProductList.vue')
var Total = require('./component/Total.vue')

new Vue({
  el: 'body',
  components: {
    productlist: ProductList,
    total: Total,
  },
  events:{
      'select-product':function (value) {
        this.$broadcast('updateitems' , value);
      }
  }
})