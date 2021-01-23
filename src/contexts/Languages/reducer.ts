import {
  CHANGE_LANGUAGE, IAction, IState
} from './types';


const LangReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      const lang = action.payload;
      localStorage.setItem('ativo-lang', lang);
      console.log(action.payload);
      return {
        ...state,
        lang
      };
    default:
      return state;
  }
};

export default LangReducer;