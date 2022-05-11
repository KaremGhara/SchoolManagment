package com.tsofen.users.controllers;

import com.tsofen.users.beans.User;
import com.tsofen.users.beans.UserLoginData;
import com.tsofen.users.helper.HelperCSV;
import com.tsofen.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    UserService userService;

//	public UserController(UserService userService) {
//		this.userService = userService;
//	}

    @GetMapping("get-all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("get-user-by-status")
    public List<User> getUsersByStatus(@RequestParam boolean status) {
        return userService.getUsersByStatus(status);
    }

    @PostMapping("create-user")
    public HttpStatus createNewSystemUser(@RequestBody User user) {
        if (this.userService.createSystemUser(user) == true) {
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.NOT_ACCEPTABLE;
        }

    }

    @DeleteMapping("delete-user")
    public HttpStatus deleteUser(int id) {
        if (userService.deleteUser(id))
            return HttpStatus.ACCEPTED;
        else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PutMapping("soft_delete_user")
    public HttpStatus softDeleteUser(@RequestBody User user) {
        userService.deleteUserBySetStatus(user);
        return HttpStatus.ACCEPTED;
        
    }

    @PostMapping("login")
    public User login(@RequestBody UserLoginData user) {
        return userService.userLogin(user);
    }

    @PutMapping("edit-user")
    public HttpStatus editUser(@RequestBody User user) {
        if (userService.editUser(user) == true) {
            return HttpStatus.ACCEPTED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }


    @GetMapping("get-user-by-socialId")
    public User getUserBySocialId(String socialId) {
        return userService.getUserBySocialId(socialId);
    }

    @GetMapping("get-user-by-id")
    public User getUserById(int id) {
        return userService.getUserById(id);
    }

    @GetMapping("get-user-by-role")
    public List<User> getUserByRole(String role) {
        return userService.getUserByRole(role);
    }


    @GetMapping("get-user-by-email")
    public User getUserByEmail(String email) {
        return userService.getUserByUserNameEmail(email);
    }


//    @GetMapping("soft-delete")
//    public ResponseEntity<List<User>> findAll(
//            @RequestParam(value = "isDeleted", required = false, defaultValue = "false") boolean isDeleted) {
//        List<User> users = userService.findAllFilter(isDeleted);
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }


    @PostMapping("upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        if (HelperCSV.checkFormatCSV(file)) {
            this.userService.saveCSV(file);
            return ResponseEntity.ok(Map.of("message", "File is uploaded and data is saved to db"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload excel file ");
    }




}
