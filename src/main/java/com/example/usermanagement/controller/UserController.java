
package com.example.usermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.usermanagement.entity.User;
import com.example.usermanagement.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPhone(user.getPhone());

            return userRepository.save(existingUser);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "User Deleted Successfully";
    }
}
