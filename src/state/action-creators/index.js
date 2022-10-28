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

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';


export const loadIngredients = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INGREDIENTS,
    });

    try {
      const response = await fetch(`${BURGER_API_URL}/ingredients`);
      if (response.ok) {
        const ingredients = (await response.json()).data;
        dispatch({
          type: FETCH_INGREDIENTS_SUCCESS,
          payload: ingredients
        });
      } else {
        dispatch({
          type: FETCH_INGREDIENTS_ERROR,
          payload: "Не удалось загрузить ингредиенты"
        });
      }
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
      const response = await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        const order = (await response.json()).order;
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: order
        });
      } else {
        dispatch({
          type: POST_ORDER_ERROR,
          payload: "Не удалось сделать заказ"
        });
      }
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