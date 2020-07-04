import toast from './toast.vue'
const obj={

}
obj.install=function(Vue){
    const toastConstructor=Vue.extend(toast)
    const toast1=new toastConstructor()
    toast1.$mount(document.createElement('div'))
    document.body.appendChild(toast1.$el)
    Vue.prototype.$gkmtoast=toast1
}
export default obj 