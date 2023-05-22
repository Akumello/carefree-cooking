package com.michaelgallahancs.carefree_cooking.entity.data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.michaelgallahancs.carefree_cooking.entity.AbstractDomainEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Ingredient extends AbstractDomainEntity
{
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes = new ArrayList<>();

    public void removeRecipe(Recipe recipe)
    {
        recipes.remove(recipe);
    }

    public void removeAllRecipes()
    {
        recipes.clear();
    }
}
