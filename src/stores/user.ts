import { ref, computed, warn, watch, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Profiles } from '@/apis/userProfile'

export const useUserProfileStore = defineStore('userProfile', () => {
    const IsLogin = ref(localStorage.getItem("Token") !== null)
    const UserProfiles= ref<null|UserProfile>(null)

    watch(IsLogin, () => {        
        if (IsLogin) {            
            Profiles().then(Response => {
                UserProfiles.value = Response.data.data 
                console.log(UserProfiles.value)
            })    
        }
    },{immediate:true})
    function SetIsLogin(isLogin:boolean){
        IsLogin.value = isLogin
    }
    return { IsLogin, UserProfiles ,SetIsLogin}
})

export interface UserProfile {
    "email": string,
    "username": string,
    "picture": string
}


