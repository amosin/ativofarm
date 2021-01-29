import React from 'react';
import { IState } from './types';

export const initialState: IState = {
  lang: localStorage.getItem('ativo-lang') || 'en-us',
  languages: ['en-us', 'pt-br','fr-fr'],
  dispatch: () => ({}),
};

export const LanguageContext = React.createContext<IState>(initialState);