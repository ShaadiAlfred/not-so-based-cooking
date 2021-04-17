export function setCurrent (state, recipe) {
  state.current = recipe;
  state.current.ingredients = state.current.ingredients.map(ingredient => {
    return {
      text: ingredient,
      checked: false,
    }
  })
}

export function setIngredientsCheckValue (state, checkValue) {
  for (let i = 0; i < state.current.ingredients.length; i++) {
    state.current.ingredients[i].checked = checkValue;
  }
}
export function switchIngredientCheckValue (state, ingredientIndex) {
  state.current.ingredients[ingredientIndex].checked = ! state.current.ingredients[ingredientIndex].checked;
}
