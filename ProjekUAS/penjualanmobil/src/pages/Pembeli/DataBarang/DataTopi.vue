<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">

        <div class="col-md-4 col-xs-12 q-pa-md" v-for="(buku, i) in data" :key="i">
          <q-card flat class="bg-white text-blue-grey-14">
            <q-card-section>
              <div class="text-h6">
                {{ buku.kodeMobil }}
              </div>
              <div>
                Tahun : {{ buku.brand }}
              </div>
            </q-card-section>
            <div >
              <q-card-section class="row items-center justify-center">
                <q-img spinner-color="white" style="height: 100%; max-width: 100%" :src="baseUrl + buku.gambar"/>
              </q-card-section>
            </div>
            <q-card-section>
              <div>
                <table>
                  <tr>
                    <td>
                      Harga
                    </td>
                    <td>:</td>
                    <td>
                      Rp. {{ buku.harga }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Body Mobil
                    </td>
                    <td>:</td>
                    <td>
                      {{ buku.bodi }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Bahan Bakar
                    </td>
                    <td>:</td>
                    <td>
                      {{ buku.bahanBakar }}
                    </td>
                  </tr>
                </table>
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn unelevated color="teal" icon="add_shopping_cart" no-caps label="Tambah Ke Keranjang"></q-btn>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DataBuku',
  data () {
    return {
      data: [],
      baseUrl: 'http://localhost:4040/gambar/'
    }
  },
  methods: {
    getDataBuku () {
      this.$axios.get('/mobil/datamobil')
        .then((res) => {
          this.data = res.data.data
        })
    }
  },
  mounted () {
    this.getDataBuku()
  }
}
</script>

<style scoped>

</style>
