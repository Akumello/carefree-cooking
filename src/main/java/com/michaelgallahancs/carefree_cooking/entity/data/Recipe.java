package com.michaelgallahancs.carefree_cooking.entity.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.michaelgallahancs.carefree_cooking.entity.AbstractDomainEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
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
    private boolean active;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "recipe_ingredient",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients = new ArrayList<>();

    public void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
    }
}
