package com.tsofen.users.repos;

import com.tsofen.users.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
	Optional<User> findByEmailEquals(String email);

	Optional<User> findBySocialIdEquals(String socialId);

	User findById(int id);

	List<User> findAllByStatus(boolean status);

	List<User> findByRoleEquals(String role);


}
