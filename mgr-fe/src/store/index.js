import { createStore, Store } from 'vuex';
import { character,user ,articleClassify} from '@/service';
import { getCharacterInfoById } from '@/helpers/character';
import { result } from '@/helpers/utils';

export default createStore({
  state: {
    characterInfo:[],
    articleClassify:[],
    userInfo:{},
    userCharacter:{},
  },
  mutations: {//去修改state
    setCharacterInfo(state,characterInfo){
      state.characterInfo = characterInfo; 
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo; 
    },
    setUserCharacter(state,userCharacter){
      state.userCharacter = userCharacter;
    },
    setArticleClassify(state,articleClassify){
      state.articleClassify = articleClassify;
    }
  },
  actions: {
    // 获取文章分类
    async getArticleClassify(store){
      const res = await articleClassify.list();

      result(res)
        .success(({data}) => {
          store.commit('setArticleClassify',data);
        });
    },
    // 获取角色信息
    async getCharacterInfo(store){
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo',data);
        });
    },
    async getUserInfo(store){
      const res = await user.info();

      result(res)
        .success(({ data })=>{
          store.commit('setUserInfo',data);

          store.commit('setUserCharacter',getCharacterInfoById(data.character));
          console.log(store.state);
        });
    }
  },

});
