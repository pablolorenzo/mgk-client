<style  scoped>
.app-footer {
  margin-top: 2rem;
  background: #eee;
  padding: 1.25rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: none;
}
</style>
<template>
  <div class="main-content">
    <breadcumb :page="'Blank'" :folder="'Pages'" />
    <b-modal v-if="loaded" id="modal-2" title="Añadir">
      {{ this.selectedService }}
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group :v-if="balanceItems.length" label="Area:">
          {{ balanceItems }}
          <b-form-select v-model="selectedBalance" required>
            <option v-for="option in balanceItems" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group :v-if="balanceItems.length" label="Tipo:">
          {{ balanceScore }}
          <b-form-select v-model="selectedBalanceScore" required>
            <option v-for="option in balanceScore" :value="option.value">
              {{ option.label }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="input-group-33" label="Cantidad">
          <b-form-input
            v-model="count"
            type="number"
            placeholder="Cantidad"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn variant="outline-primary" @click="addBalanceEntry(); $bvModal.hide('modal-2');getProviders()"
            >Añadir Balance</b-btn
          >
        </div>
      </template>
    </b-modal>
    <b-modal v-if="loaded" id="modal-pro" title="Añadir Proveedor">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-33"
          label="Nombre del Proveedor"
          label-for="input-33"
        >
          <b-form-input
            id="input-1"
            v-model="provider_name"
            type="text"
            placeholder="Nombre del Proveedor"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn variant="outline-primary" @click="addProv();$bvModal.hide('modal-pro');getProviders()"
            >Añadir Proveedor</b-btn
          >
        </div>
      </template>
    </b-modal>
    <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
      <b-dropdown-item>First Action</b-dropdown-item>
      <b-dropdown-item>Second Action</b-dropdown-item>
      <b-dropdown-item>Third Action</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item active>Active action</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item>
    </b-dropdown>
    <b-button variant="outline-primary" v-b-modal.modal-1>Añadir</b-button>
    <b-button variant="outline-primary" v-b-modal.modal-3
      >Añadir tipo gasto</b-button
    >
    <b-button variant="outline-primary" v-b-modal.modal-pro
      >Añadir Proveedor</b-button
    >
    <b-modal v-if="loaded" id="modal-3" title="Añadir tipo de balance">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Direccion" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="balance_name"
            type="text"
            placeholder="Introduce direccion"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn variant="outline-primary" @click="addBlcItem();$bvModal.hide('modal-3');getProviders()"
            >Añadir Tipo de Servicio</b-btn
          >
        </div>
      </template>
    </b-modal>
    <b-modal v-if="loaded" id="modal-1" title="Añadir servicio">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Direccion" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="direccion"
            type="text"
            placeholder="Introduce direccion"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          :v-if="providers.length"
          label="Proveedor:"
          label-for="input-3"
        >
          <b-form-select id="input-3" v-model="provider" required>
            <option v-for="option in providers" :value="option.id">
              {{ option.service_type }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="inp-2323" label="Estado:" label-for="itssss-3">
          <b-form-select
            id="itssss-3"
            v-model="status"
            :options="statuss"
            text-field="status"
            value-field="id"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-1" label="Fecha apertura:">
          <b-form-datepicker
            id="example-datepicker"
            v-model="creation_date"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group id="input-group-1" label="Fecha cierre:">
          <b-form-datepicker
            id="example-datepicker"
            v-model="finished_date"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn variant="outline-primary" @click="addServ();$bvModal.hide('modal-1');getProviders()">Añadir</b-btn>
        </div>
      </template>
    </b-modal>
    <table-one :items="services"></table-one>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import tableOne from "../../../components/datatable/tableOne.vue";

export default {
  components: {
    tableOne,
  },
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
  methods: {
    ...mapActions({
      getServices: "services/getServices",
      getProviders: "services/getProviders",
      getStatuses: "services/getStatuses",
      addService: "services/addService",
      addBalanceItem: "services/addBalanceItem",
      addProvider: "services/addProvider",
      addCost: "services/addCost"
    }),
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.direccion = "";
      this.provider = null;
    },

    async addServ() {
      this.addService({
        direccion: this.direccion,
        provider: this.provider,
        creation_date: this.creation_date,
        finished_date: this.finished_date,
        status: this.status,
      });
      this.direccion = '';
      this.provider = null;
      this.creation_date = null;
      this.finished_date = null;
      this.status = null;
    },
    async addProv() {
      this.addProvider({
        service_type: this.provider_name,
        pub_date: new Date().toISOString(),
      });
      this.provider_name = '';
    },

    async addBlcItem() {
      this.addBalanceItem({
        name: this.balance_name,
        pub_date: new Date().toISOString(),
      });
      this.name = '';
    },
    async addBalanceEntry() {
      this.addCost({
        sign: this.selectedBalanceScore,
        service_id: this.selectedService.id,
        value: this.count,
        item_type: this.selectedBalance
      });
      this.sign = null;
      this.service_id = null;
      this.value = null;
      this.item_type = null;
      console.log(this.selectedBalanceScore, this.selectedBalance, this.count)
    },
  },
  mounted() {
    this.getProviders();

    console.log("##############################");
    console.log(this);
  },
  data() {
    return {
      items: [],
      direccion: "",
      provider: null,
      status: null,
      creation_date: null,
      finished_date: null,
      balance_name: null,
      pub_date: null,
      provider_name: null,
      selectedBalance: null,
      balanceScore: [
        {
          label: "Gasto",
          value: "-",
        },
        {
          label: "Ingreso",
          value: "+",
        },
      ],
      selectedBalanceScore: null,
      count: 0
    };
  },
};
</script>
