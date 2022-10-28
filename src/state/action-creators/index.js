import {
  DELETE_INGREDIENT,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_SUCCESS,
  VIEW_INGREDIENT,
  CLOSE_INGREDIENT,
  ADD_INGREDIENT
} from "../action-types";

export const loadIngredients = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INGREDIENTS,
    });

    try {
      const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
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