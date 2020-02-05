import router from './router'
import { getToken } from "@/utils/user"

router.beforeEach((to, from, next) => {
    if(getToken()){
        console.log("%%%%%%%%%%%%%%%%%%");
            next()
    }else{
        if(to.path == "/login"){
            next()
        }else{
            next({ path : "/"})
        }
    }
  })