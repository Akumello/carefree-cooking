package com.michaelgallahancs.carefree_cooking.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Abstract Entity class to provide id column & generation strategy to data Entities
 */
@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbstractDomainEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;
}
