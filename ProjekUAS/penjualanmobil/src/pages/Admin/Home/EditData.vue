<template>
  <q-page padding class="items-center-justify-center bg-grey-3">
    <q-card flat class="bg-white q-pa-md">
      <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Edit Data Mobil</span>
      </span>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >

          <q-input
            label="Kode Mobil"
            lazy-rules
            color="teal"
            v-model="form.kodeMobil"
            :rules="[
           val => val !== null && val !== '' || 'Kode Mobil Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="dns"/>
            </template>
          </q-input>

          <q-input
            label="Harga Mobil"
            lazy-rules
            color="teal"
            v-model="form.harga"
            :rules="[
           val => val !== null && val !== '' || 'Harga Mobil Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="title"/>
            </template>
          </q-input>

          <q-input
            label="Brand"
            lazy-rules
            color="teal"
            v-model="form.brand"
            :rules="[
           val => val !== null && val !== '' || 'Brand Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="menu_book"/>
            </template>
          </q-input>

          <q-input
            label="Body Mobil"
            lazy-rules
            color="teal"
            v-model="form.bodi"
            :rules="[
           val => val !== null && val !== '' || 'Body Mobil Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="person"/>
            </template>
          </q-input>

          <q-input
            label="Bahan Bakar"
            lazy-rules
            color="teal"
            v-model="form.bahanBakar"
            :rules="[
           val => val !== null && val !== '' || 'Bahan Bakar Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="calendar_today"/>
            </template>
          </q-input>

          <q-img :src="baseUrl + this.gambar" style="width: 250px; height: 250px"/>
          <q-toggle v-model="gangtiGambar" label="Ganti Gambar ?" />
          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
            v-if="gangtiGambar == true"
            @input="selectFile()"
            color="teal"
            :rules="[
           val => val !== null && val !== '' || 'Gambar Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="add_photo_alternate"/>
            </template>
          </q-input>

          <div>
            <q-btn
              unelevated
              icon="add"
              label="Ubah Data Mobil"
              style="height: 50px"
              type="submit"
              color="teal-6"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'EditData',
  data () {
    return {
      gangtiGambar: false,
      baseUrl: 'http://localhost:4040/gambar/',
      form: {
        kodeMobil: null,
        harga: null,
        brand: null,
        bodi: null,
        bahanBakar: null
      },
      id: null,
      gambar: null
    }
  },
  methods: {
    selectFile () {
      this.gambar = this.$refs.file.$refs.input.files[0]
    },

    onSubmit () {
      const formData = new FormData()
      formData.append('gambar', this.gambar)
      formData.append('kodeMobil', this.form.kodeMobil)
      formData.append('harga', this.form.harga)
      formData.append('brand', this.form.brand)
      formData.append('bodi', this.form.bodi)
      formData.append('bahanBakar', this.form.bahanBakar)
      this.$axios.put('/mobil/ubah/' + this.id, formData)
        .then((res) => {
          if (res.data.error) {
            this.$q.notify({
              color: 'negative',
              message: res.data.msg,
              icon: 'ion-close'
            })
          } else {
            this.$q.notify({
              color: 'positive',
              message: res.data.msg,
              icon: 'ion-close'
            })
            this.$router.push('/admin')
          }
        })
    },

    getDataMobilById () {
      this.$axios.get('/mobil/datamobil/' + this.$route.params.kodeMobil)
        .then((res) => {
          this.data = res.data.data
          this.form.kodeMobil = this.data.kodeMobil
          this.form.harga = this.data.harga
          this.form.brand = this.data.brand
          this.form.bodi = this.data.bodi
          this.form.bahanBakar = this.data.bahanBakar
          this.gambar = this.data.gambar
          this.id = this.data._id
        })
    }
  },

  mounted () {
    this.getDataMobilById()
  }
}
</script>

<style scoped>

</style>
