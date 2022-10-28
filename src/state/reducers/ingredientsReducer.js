import {
  CLOSE_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_SUCCESS,
  VIEW_INGREDIENT,
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  MOVE_INGREDIENT,
  CLOSE_ORDER
} from '../action-types';

const INITIAL_STATE = {
  loading: false,
  error: "",
  ingredients: {
    buns: [],
    sauces: [],
    mains: [],
  },
  selectedBun: {},
  selectedIngredients: [],
  currentIngredient: null,
  order: null,
}

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case FETCH_INGREDIENTS_SUCCESS:
      const buns = action.payload.filter((item) => item.type === 'bun');
      const sauces = action.payload.filter((item) => item.type === 'sauce');
      const mains = action.payload.filter((item) => item.type === 'main');
      return {
        ...state,
        loading: false,
        ingredients: {
          buns: buns,
          sauces: sauces,
          mains: mains,
        },
        error: "",
        selectedBun: buns[1],
        selectedIngredients: [mains[0]]
      };
    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.slice(0, action.payload),
          ...state.selectedIngredients.slice(action.payload + 1)
        ]
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients,
          action.payload
        ]
      }
    case VIEW_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload
      }
    case CLOSE_INGREDIENT:
      return {
        ...state,
        currentIngredient: null
      }
    case MOVE_INGREDIENT:
      const ingredients = [...state.selectedIngredients];
      const temp = ingredients[action.payload.i];
      ingredients[action.payload.i] = ingredients[action.payload.j];
      ingredients[action.payload.j] = temp;
      return {
        ...state,
        selectedIngredients: ingredients
      }
    case POST_ORDER:
      return {
        ...state,
        error: ""
      }
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        order: action.payload
      }
    case POST_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case CLOSE_ORDER:
      return {
        ...state,
        order: null
      }
    default:
      return state;
  }
};

export default ingredientsReducer;
