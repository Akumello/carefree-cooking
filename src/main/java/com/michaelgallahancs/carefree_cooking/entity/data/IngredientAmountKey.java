package com.michaelgallahancs.carefree_cooking.entity.data;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Embeddable;

@Data
@EqualsAndHashCode
@Embeddable
public class IngredientAmountKey {
    private Long ingredient_id;
    private Long recipe_id;
}
