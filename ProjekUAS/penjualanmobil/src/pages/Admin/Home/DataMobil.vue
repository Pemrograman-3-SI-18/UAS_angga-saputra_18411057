<template>
  <q-page >
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >

        <template v-slot:top>
          <q-btn color="teal" :disable="loading" label="Tambah Data Mobil" to="/admin/inputdata" />
          <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="kodeMobil" :props="props">
              {{ props.row.kodeMobil }}
            </q-td>
            <q-td key="harga" :props="props">{{ props.row.harga }}</q-td>
            <q-td key="brand" :props="props">{{ props.row.brand }}</q-td>
            <q-td key="bodi" :props="props">{{ props.row.bodi }}</q-td>
            <q-td key="bahanBakar" :props="props">{{ props.row.bahanBakar }}</q-td>
            <q-td key="gambar" :props="props">
              <q-img :src="baseUrl + props.row.gambar" style="width: 50px; height: 50px"/>
            </q-td>
            <q-td key="action" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn color="teal"
                       dense size="sm"
                       class="q-px-xs"
                       icon="edit"
                       @click="edit(props.row.kodeMobil)"
                       label="Edit"></q-btn>
                <q-btn
                  color="red"
                  dense
                  size="sm"
                  @click="hapusDataMobil(props.row._id)"
                  class="q-px-xs"
                  icon="delete"
                  label="Hapus"></q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: 'http://localhost:4040/gambar/',
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'kodeMobil',
          required: true,
          label: 'Kode Mobil',
          align: 'left',
          field: row => row.kodeMobil,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'harga', align: 'center', label: 'Harga Mobil', field: 'harga', sortable: true },
        { name: 'brand', align: 'center', label: 'Brand', field: 'brand', sortable: true },
        { name: 'bodi', label: 'Body Mobil', align: 'center', field: 'bodi' },
        { name: 'bahanBakar', label: 'Bahan Bakar', align: 'center', field: 'bahanBakar' },
        { name: 'gambar', label: 'Gambar', align: 'center', field: 'gambar' },
        { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
      ],

      data: []
    }
  },

  methods: {
    // emulate fetching data from server
    getDataMobil () {
      this.$axios.get('/mobil/datamobil')
        .then((res) => {
          this.data = res.data.data
        })
    },
    hapusDataMobil (_id) {
      this.$axios.delete('/mobil/hapus/' + _id)
        .then((res) => {
          this.$q.notify({
            color: 'positive',
            message: 'Barhasil Menghapus Data'
          })
          this.getDataMobil()
        })
    },
    edit (kodeMobil) {
      this.$router.push('/admin/editdata/' + kodeMobil)
    }
  },
  mounted () {
    this.getDataMobil()
  }
}
</script>
