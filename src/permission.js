import router from './router'
import { getToken } from "@/utils/user"

router.beforeEach((to, from, next) => {
    if(getToken()){
            next()
    }else{
        if(to.path == "/login"||to.path == "/admin-login"){
            next()
        }else{
            next({ path : "/"})
        }
    }
  })