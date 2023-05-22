package com.michaelgallahancs.carefree_cooking.entity.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.michaelgallahancs.carefree_cooking.entity.AbstractDomainEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.dialect.IngresDialect;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Recipe extends AbstractDomainEntity
{
    @Column(nullable = false)
    private String name;
    private String category;
    private String version;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable (
        name = "recipe_ingredient",
        joinColumns = @JoinColumn(name = "recipe_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients = new ArrayList<Ingredient>();

    public void addIngredient(Ingredient ingredient)
    {
        ingredients.add(ingredient);
    }

    public void removeIngredient(Ingredient ingredient)
    {
        ingredients.remove(ingredient);
    }

    public void removeAllIngredients()
    {
        ingredients.clear();
    }
}
