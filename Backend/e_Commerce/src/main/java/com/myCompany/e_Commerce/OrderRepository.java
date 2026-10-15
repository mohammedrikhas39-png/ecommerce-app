package com.myCompany.e_Commerce;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface OrderRepository extends MongoRepository<Order, String>{
    List<Order> findByCustomerEmail(String customerEmail);
}
