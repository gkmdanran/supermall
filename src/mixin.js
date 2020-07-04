import backto from './components/backTo/backto'
export const backTopMixin={
    data(){
        return{
            showback:false,
        }
    },
    methods:{
        backClick(){
            if( this.$refs.scroll)
                this.$refs.scroll.scroll.scrollTo(0,0,500)
            if( this.$refs.detailscroll)
                this.$refs.detailscroll.scroll.scrollTo(0,0,500)
          },
    },
    components:{
        backto,
      },
}