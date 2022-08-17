import axios from 'axios';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';

import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from './types';

export const AuthActionCreators = {
  setUser: (payload: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload,
  }),
  setIsAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));

        setTimeout(async () => {
          const response = await axios.get<IUser[]>('./users.json');

          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password
          );

          if (mockUser) {
            console.log(mockUser);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);

            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(mockUser));
          } else {
            dispatch(
              AuthActionCreators.setError('Некорректный логин или пароль')
            );
          }

          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');

    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};