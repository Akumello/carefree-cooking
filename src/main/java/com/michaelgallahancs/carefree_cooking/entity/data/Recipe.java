package com.michaelgallahancs.carefree_cooking.entity.data;

import com.michaelgallahancs.carefree_cooking.entity.AbstractDomainEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Recipe extends AbstractDomainEntity {
    private String name;
    private String category;
    private String version;
    private boolean active;
}
