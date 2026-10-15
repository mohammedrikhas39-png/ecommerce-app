package com.myCompany.e_Commerce;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    // MongoRepository automatic ah curd method (save, findAll, findById, deleteById) வழங்கும்
}