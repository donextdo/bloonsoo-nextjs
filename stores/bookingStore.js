import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

let development = process.env.NODE_ENV !== 'production'

// const baseUrl = development ? 'http://localhost:9000' :' http://api.marriextransfer.com'
const baseUrl = 'https://api.bloonsoo.com'

export const useBookingStore = defineStore('booking', {
    state: () => ({ 
        hotelId: null, 
        bookings: [],
        hotel: null,
        isTravellingForWork: 'yes',
        fullName: null,
        email: null,
        estimatedArrivalTime: null,
        country: null,
        mobile: null,
        paymentMethod: null,
        total: null
    }),

    getters: {
        totalPrice() {
            let total = 0
            let currency
            this.bookings.forEach(b => {
                const priceSplit = b.totalPrice.split(' ')

                currency = priceSplit[0]
                total = total + parseInt(priceSplit[1])
            })

            return `${currency} ${total}`
        },

        getTotalGuests() {
            let adults = 0
            let children = 0

            this.bookings.forEach(b => {
                adults = adults + b.adults 
                children = children + b.children
            })

            if(adults > 0 && children > 0) {
                return `${adults} Adults, ${children} Children`
            }
            else
            {
                return `${adults} Adults`
            }

        }
    },

    actions: {
        setHotelId (id) {
            this.hotelId = id
        },

        setBookings (bookings) {
            this.bookings = bookings
        },

        addBooking (booking) {
            this.bookings.push(booking)
        },

        removeBooking (id) {
            this.bookings = this.bookings.filter(b => b.id !== id)
        },

        async setHotel (baseUrl) {
            try {
                const hotelData = await $fetch(`${baseUrl}/api/hotel/${this.hotelId}`)
                this.hotel = hotelData
            } catch (error) {
                console.log(error)
            }
        },

        setMobile (number) {
            this.mobile = number
        },

        setBookingInfoFirstPage (isTravellingForWork, fullName, email, estimatedArrivalTime) {
            this.isTravellingForWork = isTravellingForWork,
            this.fullName = fullName,
            this.email = email,
            this.estimatedArrivalTime = estimatedArrivalTime
        },

        setBookingInfoSecondPage (country, mobile, paymentMethod) {
            this.country = country
            this.mobile = mobile
            this.paymentMethod = paymentMethod
        },

        async createBooking () {

            const bookingDto = {
                hotel_id: this.hotelId,
                full_name: this.fullName,
                email: this.email,
                country: this.country,
                mobile: this.mobile,
                arrival_time: this.arrival_time,
                total: this.totalPrice,
                bookings: this.bookings,
                payment_method: parseInt(this.paymentMethod),
                is_travelling_for_work: this.isTravellingForWork
            }

            try {
                const booking = await $fetch(`${baseUrl}/api/booking/`, {
                    method: 'POST',
                    body: bookingDto,
                    headers: {
                        authorization: `Bearer ${useLocalStorage('token').value}`
                    }
                })

                console.log(booking)
            } catch (error) {
                throw error
            }
        }
    }
})





// export const useTaskStore = defineStore('taskStore', {
//   state: () => ({
//     tasks: [],
//     loading: false
//   }),
//   getters: {
//     favs() {
//       return this.tasks.filter(t => t.isFav)
//     },
//     favCount() {
//       return this.tasks.reduce((p, c) => {
//         return c.isFav ? p + 1 : p
//       }, 0)
//     },
//     totalCount: (state) => {
//       return state.tasks.length
//     }
//   },
//   actions: {
//     async getTasks() {
//       this.loading = true

//       // get data from json file using json server
//       const res = await fetch('http://localhost:3000/tasks')
//       const data = await res.json()

//       this.tasks = data
//       this.loading = false
//     },
//     async addTask(task) {
//       this.tasks.push(task)

//       const res = await fetch('http://localhost:3000/tasks', {
//         method: 'POST',
//         body: JSON.stringify(task),
//         headers: {'Content-Type': 'application/json'}
//       })

//       if (res.error) {
//         console.log(res.error)
//       }
//     },
//     async deleteTask(id) {
//       this.tasks = this.tasks.filter(t => {
//         return t.id !== id
//       })

//       const res = await fetch('http://localhost:3000/tasks/' + id, {
//         method: 'DELETE',
//       })

//       if (res.error) {
//         console.log(res.error)
//       }
//     },
//     async toggleFav(id) {
//       const task = this.tasks.find(t => t.id === id)
//       task.isFav = !task.isFav

//       const res = await fetch('http://localhost:3000/tasks/' + id, {
//         method: 'PATCH',
//         body: JSON.stringify({ isFav: task.isFav }),
//         headers: {'Content-Type': 'application/json'}
//       })

//       if (res.error) {
//         console.log(res.error)
//       }
//     }
//   }
// })
