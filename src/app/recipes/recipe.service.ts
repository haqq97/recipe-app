import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
// Using this service to manage recipes in a central place
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Shrimp Pasta Alfredo',
  //     'This shrimp alfredo pasta is what I like to call an “Amerifredo” or an American-style alfredo sauce. An Authentic Roman alfredo sauce does not include any heavy cream or garlic, and it derives all of its creaminess and flavor from the butter and really good Parmesan.',
  //     'https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     [
  //       new Ingredient('Bow Tie Pasta', 3),
  //       new Ingredient('Frozen Peas', 2),
  //       new Ingredient('Shrimp', 2),
  //       new Ingredient('Alfredo Sauce', 1),
  //       new Ingredient('Shredded Parmesan Cheese', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Pesto Baked Rigatoni',
  //     'This baked rigatoni recipe is perfect for a quick and easy weeknight meal. Simple and easy to make with just 4 ingredients, this dish is on the table in just 30 minutes.',
  //     'https://images.themodernproper.com/billowy-turkey/production/posts/2022/Baked-Rigatoni_8.jpg?w=1200&h=1800&q=82&fm=jpg&fit=crop&dm=1664940705&s=79b685616b4907522ee2515987c2f2dc',
  //     [
  //       new Ingredient('Tomatoes', 5),
  //       new Ingredient('Pesto', 2),
  //       new Ingredient('Rigatoni', 3),
  //       new Ingredient('Mozzarella Cheese', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'Baked Chicken Tacos',
  //     'Chicken Tacos are the perfect easy weeknight dinner. These baked chicken tacos have lots of flavor and none of the stress. The ultimate recipe for serving a crowd. This is the most popular recipe on The Cookie Rookie, being pinned over 2 million times and viewed over 6 million times.',
  //     'https://www.thecookierookie.com/wp-content/uploads/2015/12/oven-baked-spicy-chicken-tacos-6-of-14.jpg',
  //     [
  //       new Ingredient('Olive Oil', 1),
  //       new Ingredient('Chicken', 1),
  //       new Ingredient('Taco Seasoning', 1),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Diced Tomatoes', 1),
  //       new Ingredient('Green Chillies', 1),
  //       new Ingredient('Taco Shells', 10),
  //       new Ingredient('Mexican Cheese', 2),
  //       new Ingredient('Refried Beans', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    // returns a copy of recipe array
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
