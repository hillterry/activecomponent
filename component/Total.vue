<style scoped>

</style>

<template>
    <div class="total-select">
        <div class="amount-sum">
            已选择<em>{{qty}}</em>件商品
        </div>

        <div class="price-sum">
            <div>
                <span class="txt">总价：</span>
                <span class="price sumPrice"><em>¥{{totalprice}}</em></span>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        data () {
            return {
                qty: 0,
                totalprice: 0,
            }
        },
        events:{
            'updateitems': function (value){
                let itemqty = 0 ,
                    totalprice = 0;
                for(let i=0; i<value.length ; i++){
                    itemqty += parseInt(value[i]['qty']);
                    totalprice += value[i]['qty'] * value[i]['price']
                }
                this.qty = itemqty;
                this.totalprice = totalprice;
            },
        }
    }
</script>

