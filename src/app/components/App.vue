<template>
<div>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">  
      <div class="container">
        <a href="#" class="navbar-brand">
        <img src="https://i.ibb.co/jGG0VxM/adtracker-mini.png"></a>
        <a href="/" class="navbar-brand stations">Stations Monitoring</a>
      </div>
    </nav>

    <div class="card mt-5 mb-5 ">
      <div class="card-body">
        <form id="select-form">

          <h5 class="card-title">Select Country</h5>
          <select class="form-control" v-model="monitoreo.pais" name="pais" data-style="btn-info">
            <option value="Mexico">Mexico</option>
            <option value="Honduras">Honduras</option>

          </select>

          <h5 class="card-title mt-2">TV and Radio</h5>
          <input type="checkbox" id="TV" value="TV">
          <label for="TV">TV</label>
          <input type="checkbox" id="Radio" value="Radio">
          <label for="Radio">Radio</label>

          <h5 class="card-title">Select a Channel</h5>

          <input type="checkbox" id="MVS" value="MVS Noticias" v-model="monitoreo.checkedStations">
          <label for="MVS">MVS Noticias</label>
          <input type="checkbox" id="SFM" value="Siempre FM" v-model="monitoreo.checkedStations">
          <label for="SFM">Siempre FM</label>
          <input type="checkbox" id="HFM" value="Horizonte FM" v-model="monitoreo.checkedStations">
          <label for="HFM">Horizonte FM</label>

          <h5>Select an Ad</h5>

          <div action="" class="form-group">
            <select v-model="monitoreo.title" name="estacion" data-style="btn-info" class="form-control">
              <option v-for="ad of ads">{{ad.title}}</option>
            </select>
          </div>
          <div class="form-group">
            <h5>Select date range</h5>
            <input v-model="monitoreo.firstDate" type="date" name="firstDate" id="firstDate" class="form-control mb-1">
            <input v-model="monitoreo.secondDate" type="date" name="secondDate" id="secondDate" class="form-control">
          </div>
        </form>
         <input type="submit" class="btn btn-primary" @click="sendAndGet">
      </div>
    </div>


    <div class="">
      <div class="">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Transmitted time</th>
              <th>Country</th>
              <th>Channel</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="registro of registros">
                <td>{{registro.fechaHora}}</td>
                <td>{{registro.title}}</td>
                <td>{{registro.duration}}</td>
                <td>{{registro.played_duration}}</td>
                <td>{{registro.country}}</td>
                <td>{{registro.channel}}</td>
              </tr>
            </tbody>

         
        </table>
      </div>

      
    </div> 
 </div>
</div>

</template>


<script>
export default {

    data() {
        return {
            monitoreo: {
                title: '',
                firstDate: '',
                secondDate: '',
                pais: '',
                checkedStations: []
            },
            ads: [],
            registros: []
        }
    },

    created() {
      this.chargeAds();
    },

    methods: {

        sendAndGet() {
          
          fetch('/metadata', {
            method: 'POST',
            body: JSON.stringify(this.monitoreo),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => { 
              this.registros = data;
              // console.log(this.registros);
            })
          .then(data => console.log(data))
                    
        }, // final del getAndSend

        chargeAds() {
          fetch('/ads')
          .then(res => res.json())
          .then(data => { 
              this.ads = data.items;
              console.log(this.ads);
            })
        } // Final del chargeAds
    }
    
}
</script>
