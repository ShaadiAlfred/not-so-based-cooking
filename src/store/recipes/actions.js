export function setCurrent ({ commit }, recipe) {
  commit('setCurrent', recipe);
}

export function switchIngredientsCheckValue ({ state, commit }) {
  let checkValue = true;

  if (state.current.ingredients.every(ingredient => ingredient.checked)) {
    checkValue = false;
  }

  commit('setIngredientsCheckValue', checkValue);
}

export function switchIngredientCheckValue ({ state, commit }, ingredientIndex) {
  commit('switchIngredientCheckValue', ingredientIndex);
}
