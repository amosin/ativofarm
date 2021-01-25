import { Dispatch } from "react";

export const CHANGE_LANGUAGE: string = 'CHANGE_LANGUAGE';

export interface IState {
  lang: string;
  languages: string[];
  dispatch: Dispatch<IAction>;
}

export interface IAction {
  type: string;
  payload: any;
}