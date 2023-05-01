import { ref, computed, warn, watch, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getProfiles } from '@/apis/users/profile'

export const useUserProfileStore = defineStore('userProfile', () => {
    const IsLogin = ref(localStorage.getItem("Token") !== null)
    const UserProfiles= ref<null|UserProfile>(null)

    watch(IsLogin, () => {  
        console.log(IsLogin.value)      
        if (IsLogin.value) {            
            ReloadUserProfiles()  
        }
    },{immediate:true})
    function SetIsLogin(isLogin:boolean){
        IsLogin.value = isLogin
    }
    function ReloadUserProfiles(){
        getProfiles().then(Response => {
            UserProfiles.value = Response.data.data 
            console.log(UserProfiles.value)
        }) 
    }
    return { IsLogin, UserProfiles ,SetIsLogin,ReloadUserProfiles}
})

export interface UserProfile {
    "email": string,
    "username": string,
    "picture": string
}


