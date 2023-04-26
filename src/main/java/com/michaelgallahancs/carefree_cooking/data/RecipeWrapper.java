
package com.michaelgallahancs.carefree_cooking.data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "name",
    "category",
    "version",
    "ingredients",
    "instructions"
})
@Generated("jsonschema2pojo")
public class RecipeWrapper
{
    private Recipe recipe;
    public Recipe getRecipe(){
        if(recipe != null)
            return recipe;

        recipe = new Recipe();
        recipe.setName(name);
        recipe.setCategory(category);
        recipe.setVersion(version);


        instructions.forEach(instruction -> {
            instruction.setRecipe(recipe);
        });
        System.out.println("--- INGREDIENTS ---\n" + ingredients);

//        ingredients.forEach(ingredient -> {
//            ingredient.getRecipes().add(recipe); // Many to many
//        });
//
//        recipe.setIngredients(ingredients);

        return recipe;
    }

    @JsonProperty("name")
    private String name;
    @JsonProperty("category")
    private String category;
    @JsonProperty("version")
    private String version;
    @JsonProperty("ingredients")
    private List<Ingredient> ingredients = null;
    @JsonProperty("instructions")
    private List<Step> instructions = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("category")
    public String getCategory() {
        return category;
    }

    @JsonProperty("category")
    public void setCategory(String category) {
        this.category = category;
    }

    @JsonProperty("version")
    public String getVersion() {
        return version;
    }

    @JsonProperty("version")
    public void setVersion(String version) {
        this.version = version;
    }

    @JsonProperty("ingredients")
    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    @JsonProperty("ingredients")
    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    @JsonProperty("instructions")
    public List<Step> getInstructions() {
        return instructions;
    }

    @JsonProperty("instructions")
    public void setInstructions(List<Step> instructions) {
        this.instructions = instructions;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
