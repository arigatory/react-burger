import {
  DELETE_INGREDIENT,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_SUCCESS,
  VIEW_INGREDIENT,
  CLOSE_INGREDIENT,
  MOVE_INGREDIENT,
  POST_ORDER,
  CLOSE_ORDER,
  ADD_INGREDIENT,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR
} from "../action-types";
import { BURGER_API_URL } from '../../utils/constants';
import { request } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

export const loadIngredients = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INGREDIENTS,
    });

    try {
      const response = await request(`${BURGER_API_URL}/ingredients`);
      const ingredients = response.data;
      dispatch({
        type: FETCH_INGREDIENTS_SUCCESS,
        payload: ingredients
      });
    } catch (err) {
      if (err) {
        dispatch({
          type: FETCH_INGREDIENTS_ERROR,
          payload: err.message,
        });
      }
    }
  }
}

export const deleteIngredient = (index) => {
  return {
    type: DELETE_INGREDIENT,
    payload: index
  }
}

export const viewIngredient = (ingredient) => {
  return {
    type: VIEW_INGREDIENT,
    payload: ingredient
  }
}

export const closeIngredient = () => {
  return {
    type: CLOSE_INGREDIENT
  }
}

export const addIngredient = (ingredient) => {
  ingredient = { ...ingredient, dragId: uuidv4() };
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  }
}

export const moveIngredient = (i, j) => {
  return {
    type: MOVE_INGREDIENT,
    payload: {
      i: i,
      j: j
    }
  }
}

export const postOrder = (ids) => {
  return async (dispatch) => {
    dispatch({
      type: POST_ORDER,
    });

    try {
      const body = {
        ingredients: ids
      };
      const response = await request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      const order = response.order;
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: order
      });
    } catch (err) {
      if (err) {
        dispatch({
          type: POST_ORDER_ERROR,
          payload: err.message,
        });
      }
    }
  }
}

export const closeOrder = () => {
  return {
    type: CLOSE_ORDER
  }
}