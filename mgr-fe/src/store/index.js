import { createStore, storeKey } from 'vuex';
import { character } from '@/service';
import { result } from '@/helpers/utils';

export default createStore({
  state: {
    characterInfo:{},
  },
  mutations: {//去修改state
    setCharacterInfo(state,characterInfo){
      state.characterInfo = characterInfo; 
    }
  },
  actions: {
    async getCharacterInfo(){
      const res = await character.list()

      result(res)
        .success(({ data }) => {
          storeKey.commit('setCharacterInfo',data);
        })
    }
  },

});
