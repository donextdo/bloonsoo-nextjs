import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

let development = process.env.NODE_ENV !== 'production'

// const baseUrl = development ? 'http://localhost:9000' :' http://localhost:9000'
// const baseUrl = development ? 'http://localhost:9000' :' http://api.marriextransfer.com'
const baseUrl = 'https://api.bloonsoo.com'

export const useAuthStore = defineStore('auth', {
    state: () => ({  
        user: null,
        userEmail: null 
    }),

    getters: {
        getToken() {
            return useLocalStorage('token')
        },

        getFullName() {
            if(this.user.firstName && this.user.lastName) {
                return `${this.user.firstName} ${this.user.lastName}`
            }
            else {
                return false
            }
        },

        getInitials() {
            if(this.user.firstName && this.user.lastName) {
                return `${this.user.firstName[0]}${this.user.lastName[0]}`
            }
            else {
                return this.user.username[0]
            }
        },

        getYear() {
            let date = new Date(this.user.createdAt)
            const year = date.getFullYear()
            return year
        }
    },

    actions: {
        async getAuthUser() {
            try {

                this.user = await $fetch(`${baseUrl}/api/auth/user`, {
                    headers: {
                        authorization: `Bearer ${useLocalStorage('token').value}`
                    }
                })


            } catch (error) {
                this.user = null
                console.log(error)
            }
        },

        setUser(user) {
            this.user = user
        },

        async nuxtServerInit(context) {
            try {
                if (token) {
                    const user = await $fetch(`${baseUrl}/api/auth/user`, {
                        headers: {
                            authorization: `Bearer ${useLocalStorage('token').value}`
                        }
                    })
                    this.user = user
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})
