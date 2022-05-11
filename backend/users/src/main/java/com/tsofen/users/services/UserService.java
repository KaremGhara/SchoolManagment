package com.tsofen.users.services;

import com.tsofen.users.beans.User;
import com.tsofen.users.beans.UserLoginData;
import com.tsofen.users.helper.HelperCSV;
import com.tsofen.users.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
//extend WebSecurityConfigurerAdapter
@Service
public class UserService {
	@Autowired
	private UserRepo userRepo;
	EntityManager entityManager;


	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public boolean createSystemUser(User user) {
		Optional<User> existUser = userRepo.findByEmailEquals(user.getEmail());
		if (existUser.isPresent())
		{
			throw new IllegalStateException("User #" + existUser.get().getId() + "-" +
					existUser.get().getFname() + " " + existUser.get().getLname() +" Already Exists!");
		}
		else {
//			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//			String encodedPassword = passwordEncoder.encode(user.getPassword());
//			user.setPassword(encodedPassword);
			userRepo.save(user);
			return true;
		}
	}

	public User userLogin(UserLoginData userLoginData) {
		Optional<User> user = userRepo.findByEmailEquals(userLoginData.getEmail());
		if (user.isEmpty() || !user.get().getPassword().equals(userLoginData.getPassword())) {
			return null;
		}
		return user.get();
	}

	@Transactional
	public boolean editUser(@RequestBody  User user) {
		User userToUpdate = userRepo.findById(user.getId());
			user.setId(userToUpdate.getId());
			userRepo.save(user);
			return true;

	}

	public boolean deleteUser(int id) {
		User user = userRepo.findById(id);

		if (user != null) {
			user.setStatus(false);
			userRepo.deleteById(user.getId());
			return true;
		}
		return false;

	}

	@Transactional
	public boolean deleteUserBySetStatus(User user) {
		User userToDelete = userRepo.findById(user.getId());
		if (userToDelete != null) {
			user.setStatus(false);
			userRepo.save(user);
			return true;
		} else {
			return false;
		}

	}

	public List<User> getUsersByStatus(boolean status) {
		return userRepo.findAllByStatus(status);
	}


	public User getUserBySocialId(String socialId) {
		Optional<User> user = userRepo.findBySocialIdEquals(socialId);
		if (user.isEmpty())
			throw new IllegalStateException("User with ID: " + socialId + " Doesn't Exist!");
		else
			return user.get();
	}


	public User getUserById(int id) {
		return userRepo.findById(id);

	}

	public User getUserByUserNameEmail(String email) {
		Optional<User> user = userRepo.findByEmailEquals(email);
		if(user.isEmpty())
			throw new IllegalStateException("User with ID: " + email + " Doesn't Exist!");
		else
			return user.get();
	}


	public void saveCSV(MultipartFile file) {
		try {
			List<User> users = HelperCSV.loadUsersDataFromExcelToUserObject(file.getInputStream());
			for(User usr:users)
			{
				Optional<User> exsisting = userRepo.findByEmailEquals(usr.getSocialId());
				if(exsisting==null) {
					this.userRepo.save(usr);
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public List<User> getUserByRole(String role) {
		return userRepo.findByRoleEquals(role);
	}


//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.authorizeRequests()
//				.antMatchers("/users").authenticated()
//				.anyRequest().permitAll()
//				.and()
//				.formLogin()
//				.usernameParameter("email")
//				.defaultSuccessUrl("/users")
//				.permitAll()
//				.and()
//				.logout().logoutSuccessUrl("/").permitAll();
//	}
//	public List<User> findAllFilter(boolean isDeleted) {
//		Session session = entityManager.unwrap(Session.class);
//		Filter filter = session.enableFilter("deletedUserFilter");
//		filter.setParameter("isDeleted", isDeleted);
//		List<User> users = userRepo.findAll();
//		session.disableFilter("deletedUserFilter");
//		return users;
//	}


//	public void saveCSV(MultipartFile file) {
//		try {
//			//List<User> user = HelperCSV.convertExcelToUser(file.getInputStream());
//			List<ProjectEntity> user = HelperCSV.convertExcel(file.getInputStream(), "USER");
//			for(ProjectEntity usr:user)
//			{
//				Optional<User> exsisting = userRepo.findBySocialId(((User)usr).getSocialId());
//				if(!exsisting.isPresent())
//				{
//					this.userRepo.save((User)usr);
//				}
//			}
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//	}
}
