<template>
  <v-container>
      <v-row align="center" justify="center">
          <v-col cols="8">
              <v-card class="mt-5">
                  <v-card-title class="justify-center">PQRs</v-card-title>

                  <v-card-text>
                      <v-row justify="center" align="center">
                          <v-col cols="12">
                            <v-data-table
                                :headers="headers"
                                :items="pqrs"
                                class="elevation-1"
                            >
                                <template v-slot:item.request_type = "{ item }">
                                    <span>{{ requestType(item.request_type) }}</span>
                                </template>
                                <template v-slot:item.request_state = "{ item }">
                                    <span>{{ requestState(item.request_state) }}</span>
                                </template>
                                <template v-slot:item.created_at = "{ item }">
                                    <span>{{ new Date(item.created_at).toISOString().split('T')[0] }}</span>
                                </template>
                                <template v-slot:item.actions = "{ item }">
                                    <v-icon small class="mr-2" @click="showInfo(item)">
                                        mdi-eye
                                    </v-icon>
                                </template>
                            </v-data-table>
                          </v-col>
                      </v-row>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
    data(){
        return {
            headers: [
                {
                    text: 'Asunto',
                    value: 'subject'
                },
                {
                    text: 'Tipo',
                    value: 'request_type'
                },
                {
                    text: 'Estado',
                    value: 'request_state'
                },
                {
                    text: 'Creado el',
                    value: 'created_at'
                },
                {
                    text: 'Acciones',
                    value: 'actions'
                }
            ],
            pqrs: []
        }
    },
    created() {
        this.findPQR()
    },
    methods: {
        findPQR(){
            Axios
            .get("https://pqr-api-rails.herokuapp.com/requests/general_requests",{headers: {Authorization: localStorage.getItem("token")}})
            .then(
                response => {
                    if(response && response.data && response.data.request){
                        this.pqrs = response.data.request.sort(function (a,b) { return -(a.id - b.id)})
                    }
                    console.log(response)
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        },
        requestType(text){
            if(text && text == "request"){
                return "Petición"
            } else if(text && text == "complain"){
                return "Queja"
            } else if(text && text == "claim"){
                return "Reclamo"
            }
            return text
        },
        requestState(text){
            if(text && text == "settled"){
                return "Abierta"
            } else if(text && text == "in_progress"){
                return "En progreso"
            } else if(text && text == "solved"){
                return "Resuleta"
            } else if(text && text == "closed"){
                return "Cerrada"
            }
            return text
        },
        showInfo(pqr){
            this.$router.push({ 
                name: 'ShowAdminPQR', 
                params: { 
                    pqr: pqr 
                } 
            })
        }
    }
}
</script>

<style>

</style>