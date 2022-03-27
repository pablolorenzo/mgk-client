<template>
  <div>
    
    <vue-good-table :columns="columns" :rows="items">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'balance'">
          {{ props.formattedRow[props.column.field] }} €
        </span>
        <span v-else-if="props.column.field == 'Opciones'">
          <b-button variant="outline-primary" v-b-modal.modal-2 @click.stop="updateSelectedService(props.row)">Añadir</b-button>
        </span>
        <span v-else-if="props.column.field == 'started_date'">
          {{ props.formattedRow[props.column.field] | moment("DD MMMM YYYY")}} <br/>
          {{ props.formattedRow['finished_date'] | moment("DD MMMM YYYY") || '.'}}
        </span>
        <span v-else-if="props.column.field == 'provider_id'">
          <b-form-select id="input-3" v-model="props.formattedRow[props.column.field]" required>
            <option v-for="option in providers" :value="option.id">
              {{ option.service_type }}
            </option>
          </b-form-select>
        </span>
        <span v-else-if="props.column.field == 'status_id'">
          <b-form-select
            id="itssss-3"
            @change="changedValueStatus(props.row)"
            v-model="props.formattedRow[props.column.field]"
            :options="statuss"
            text-field="status"
            value-field="id"
          ></b-form-select>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["items"],
  computed: {
    ...mapState({
      balanceItems: (state) => state.services.balanceItems,
      services: (state) => state.services.services,
      providers: (state) => state.services.providers,
      statuss: (state) => state.services.statuses,
      selectedService: (state) => state.services.selectedService,
      loaded: (state) => state.services.loaded,
    }),
  },
  data() {
    return {
      direccion: "",
      columns: [
        {
          label: "Direccion",
          field: "address",
        },
        {
          label: "Estado",
          field: "status_id",
        },
        {
          label: "Proveedor",
          field: "provider_id",
        },
        {
          label: "Apertura",
          field: "started_date",
        },
        {
          label: "Balance",
          field: "balance",
        },
        {
          label: "Opciones",
          field: "Opciones",
        },
      ],
      rows: [],
    };
  },
  methods: {
    ...mapActions({
      updateSelService: "services/updateSelectedService",
    }),
    changedValueStatus(updateElement) {
      console.log("####################################");
      // TODO: POR AQUI VAS ACTUALIZAR ESTADOS  Y PROVEEDORES
      console.log(updateElement);
    },
    updateSelectedService(service) {
      this.updateSelService({service});
    }
  }
};
</script>