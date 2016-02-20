<style scoped>
.item-form{
    font-size:0;
}
.cell{
    display:inline-block;
    font-size:16px;
    vertical-align:middle;
}
.p-checkbox{
    width:5%;
}
.p-goods{
    width:45%;
}
.p-price{
    width:10%;
}
.p-quantity{
    width:30%;
    text-align:center;
}
.p-sum{
    width:10%;
}
.goods-item{
    font-size:0;
}
.p-img,.p-name{display:inline-block; width:50%; font-size:16px;vertical-align:middle;}
.p-img{
    text-align:center;
}
.p-img img{
    width:200px;
}
.itxt{
    width:20px;
    text-align:center;
}
.item-form{
    margin-bottom:20px;
}
a{
    text-decoration:none;
}
</style>

<template>
 <div class="app">
    <div v-for="item in list">
        <div class="item-form">
            <div class="cell p-checkbox">
                <div class="cart-checkbox">
                    <input type="checkbox" id="product{{$index}}" v-bind:value="$index" v-model="checkedItems" v-on:change="itemSelected($index)">
                    <span class="line-circle"></span>
                </div>
            </div>
            <div class="cell p-goods">
                <div class="goods-item">
                    <div class="p-img">
                        <a href="" target="_blank">
                            <img alt="{{item.name}}" v-bind:src="item.imgurl">
                        </a>
                    </div>
                    <div class="p-name">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="cell p-price">
                <strong>{{item.price}}</strong>
            </div>

            <div class="cell p-quantity">
                <div class="quantity-form">
                    <a href="javascript:void(0);" class="decrement" v-on:click="decrement($index,$event)">-</a>
                    <input type="text" class="itxt" v-bind:value="item.qty" v-on:change="changeQty($index, $event)">
                    <a href="javascript:void(0);" class="increment" v-on:click="increment($index,$event)">+</a>
                </div>
                <div class="quantity-txt" v-if="item.qty <= item.stock">
                    有货
                </div>
                <div class="quantity-txt" v-else>
                    缺货
                </div>
            </div>
            <div class="cell p-sum">
                <strong>{{item.price * item.qty}}</strong>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {data} from '../data/cartinfo'

//每次涉及到金额运算的时候都把数据派发给父组件，让父组件来广播给其他组件
function dispatch(){
    let updateItems = [];
    for(let i=0 ; i < this.checkedItems.length ; i++){
        updateItems.push(data.data[this.checkedItems[i]])
    }
    this.$dispatch('select-product' , updateItems)
}

export default {
  data () {
    return {
      list: data.data,
      checkedItems:[]
    }
    },
    methods: {
        decrement: function (index, event) {
            if(data.data[index]['qty'] <= 1){
                return
            }
            data.data[index]['qty']--;
            dispatch.bind(this)()
        },
        increment: function (index, event) {
            data.data[index]['qty']++;
            dispatch.bind(this)()
        },
        changeQty: function (index, event) {
            if(event.target.value.toString() === '0'){
                event.target.value = 1;
                data.data[index]['qty'] = 1;
            }else{
                data.data[index]['qty'] = event.target.value;
            }
            dispatch.bind(this)()
        },
        itemSelected: function (){
            dispatch.bind(this)()
        }
    }
}

</script>