import { ServicesService, ProviderService } from '../../_services';
//ServicesService.getServices();
const state = {
  services: [],
  providers: [],
  providersMap: {},
  statusMap: {},
  selectedService: null,
  balanceItems: [],
  loaded: false,
};

const getters = {};

const actions = {
  getProviders({ commit, rootState }) {
    return ProviderService.getProviders()
      .then((providers) => {
        console.log(providers)
        let providerMap = {}
        for (let i = 0; i < providers.length; i += 1) {
          providerMap[providers[i].id] = providers[i].service_type
        }
        commit('setProvidersMap', providerMap);
        commit('setProviders', providers);
        return ProviderService.getBalanceType()
          .then((balanceItems) => {
            commit('setBalanceItems', balanceItems)
            return ProviderService.getStatuses()
              .then((statuses) => {
                console.log(statuses)
                let statusMap = {}
                for (let i = 0; i < statuses.length; i += 1) {
                  statusMap[statuses[i].id] = statuses[i].status

                }
                commit('setStatusesMap', statusMap);
                console.log(statusMap);
                commit('setStatuses', statuses);
                return ServicesService.getServices()
                  .then((services) => {
                    console.log(services);
                    /*console.log("###############################");
                    console.log(rootState.services.statusMap);
                    console.log(rootState.services.providersMap);
                    for (let i = 0; i < services.length; i += 1) {
                      services[i].status_id = rootState.services.statusMap[services[i].status_id];
                      services[i].provider_id = rootState.services.providersMap[services[i].provider_id];

                    }*/
                    commit('setServices', services.results);
                    commit('setLoaded', true)
                  });
              });
          });
      });

  },
  addProvider({ commit }, parameters) {
    return ProviderService.addProvider(parameters)
      .then((provider) => {
        console.log(provider)

        commit('addProv', provider);
      });

  },
  
  addCost({ commit }, parameters) {
    return ProviderService.addCost(parameters)
      .then((cost) => {
        console.log(cost)

        //commit('addServ', service);
      });

  },
  addService({ commit }, parameters) {
    return ProviderService.addService(parameters)
      .then((service) => {
        console.log(service)

        commit('addServ', service);
      });

  },
  addBalanceItem({ commit }, parameters) {
    console.log("LLEGAMOS ASASDASDASDASD@@@@@@@@@@@@")
    return ProviderService.addBalanceItem(parameters)
      .then((balanceItem) => {
        console.log(balanceItem)

        commit('addBalItem', balanceItem);
      });

  },
  
  updateSelectedService({ commit }, parameters) {
    commit('setSelectedService', parameters.service);
  }
};

const mutations = {
  setServices(state, services) {
    state.services = services;
  },
  setBalanceItems(state, balanceItems) {
    state.balanceItems = balanceItems;
  },
  setProviders(state, providers) {
    state.providers = providers;
  },
  setStatuses(state, statuses) {
    console.log("cambiando los statuses por statuses", statuses);
    state.statuses = statuses;
  },
  setProvidersMap(state, providerMap) {
    state.providersMap = providerMap;
  },
  setStatusesMap(state, statusMap) {
    state.statusMap = statusMap;
  },
  addServ(state, service) {
    state.services.push(service);
  },
  addProv(state, provider) {
    state.providers.push(provider);
  },
  addBalItem(state, balanceItem) {
    state.balanceItems.push(balanceItem);
  },
  setSelectedService(state, service) {
    state.selectedService = service;
  },
  setLoaded(state, loaded) {
    state.loaded = loaded;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  
};

