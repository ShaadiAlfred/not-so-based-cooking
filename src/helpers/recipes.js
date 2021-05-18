import { getDb } from 'src/services/firebase';

const recipesCollection = getDb().collection('recipes');

export async function getRecipeBySlug (slug) {
  try {

    const querySnapshot = await (recipesCollection
      .where('slug', '==', slug)
      .get());

    if (! querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }

    return null;

  } catch (e) {
    console.error('Error getting recipe:', e.message);
  }
}

export function formatTime(time) {
  if (time < 1) {
    return (time * 100) + ' minutes';
  }

  time = time * 100;
  time = time.toString();
  const hours = time.substring(0, time.length - 2);
  const minutes = time.substring(time.length - 2, time.length);

  return `${hours} hour(s) ${minutes} minute(s)`;
}

export async function getPublishedRecipes (numberOfShownRecipes) {
  try {

    const querySnapshot = await (recipesCollection
      .where('is_published', '==', true)
      .orderBy('created_at', 'desc')
      .limit(numberOfShownRecipes + 4)
      .get());

    if (! querySnapshot.empty) {
      return querySnapshot.docs.slice(numberOfShownRecipes, querySnapshot.docs.length).map(recipe => recipe.data());
    }

    return null;

  } catch (e) {
    console.error('Error getting recipe:', e.message);
  }
}

export async function storeRecipe (recipe) {
  try {
    return await (recipesCollection.add(recipe));
  } catch (e) {
    return null;
  }
}
