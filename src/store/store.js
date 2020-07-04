import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        carList:[]
    },
    mutations:{
       addCounter(state,payload){
           payload.count++
       },
       addToCar(state,payload){
            state.carList.push(payload)
       },
       changeChecked(state,iid){
           for(let item of state.carList){
               if(item.iid==iid){
                   item.isChecked=!item.isChecked
                   
               }
           }
       },
       changeAll(state,val){
            for(let item of state.carList){
                item.isChecked=val
               
            }
        }
       
    },
    actions:{
        addCar(context,payload){
            return new Promise((resolve,reject)=>{
                let oldProduct=null;
                for(let item of context.state.carList){
                    if(item.iid==payload.iid){
                        oldProduct=item
                    }
                }
                payload.isChecked=false
                if(oldProduct){
                    context.commit('addCounter',oldProduct)
                    resolve("商品数量+1")
                }
                else{
                    payload.count=1
                   context.commit('addToCar',payload)
                   resolve("添加商品成功")
                }
                
            })
        }
    }
})
export default store 