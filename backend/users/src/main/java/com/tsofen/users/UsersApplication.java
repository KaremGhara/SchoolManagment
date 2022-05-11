package com.tsofen.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.User;
import com.tsofen.users.services.ProgramService;
import com.tsofen.users.services.SchoolService;
import com.tsofen.users.services.UserService;

@SpringBootApplication
public class UsersApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UsersApplication.class, args);
		System.out.println("Server is Ready!");
		
		
	}
	@Autowired
	UserService usersService;
	
	@Autowired
	SchoolService schoolService;
	
	@Autowired
	ProgramService programService;

	@Override
	public void run(String... args) throws Exception {
		try
		{
			
			School school=new School();
			school.setAddress("מחאמיד");
			school.setName("עומר בן אלחטאב");
			schoolService.addSchool(school);
	
			School school1=new School();
			school1.setAddress("עין גראר");
			school1.setName("אלאחוה");
			schoolService.addSchool(school1);
			
			School school2=new School();
			school2.setAddress("מחאמיד");
			school2.setName("אלזהראא");
			schoolService.addSchool(school2);
			
			School schoo3=new School();
			schoo3.setAddress("מחאגנה");
			schoo3.setName("אבן סינה");
			schoolService.addSchool(schoo3);
			
			User user=new User();
			user.setEmail("prog_mngr@gmail.com");
			user.setFname("Lana");
			user.setLname("Shehyosef");
			user.setPassword("123456");
			user.setPhone("0544285737");
			user.setRole("ProgramManager");
			user.setSocialId("112233445");
			user.setStatus(true);
			usersService.createSystemUser(user);
			
			User user1=new User();
			user1.setEmail("man_mngr@gmail.com");
			user1.setFname("Mahamod");
			user1.setLname("Hamed");
			user1.setPassword("123456");
			user1.setPhone("0547807860");
			user1.setRole("MuncipalityManager");
			user1.setSocialId("223344556");
			user1.setStatus(true);
			usersService.createSystemUser(user1);
	
			
			User user2=new User();
			user2.setEmail("admin@gmail.com");
			user2.setFname("Bilal");
			user2.setLname("Mahamid");
			user2.setPassword("123456");
			user2.setPhone("0526610004");
			user2.setRole("Admin");
			user2.setSocialId("334455667");
			user2.setStatus(true);
			usersService.createSystemUser(user2);
	
			
			User user3=new User();
			user3.setEmail("schl_stf@gmail.com");
			user3.setFname("Karem");
			user3.setLname("Grah");
			user3.setPassword("123456");
			user3.setPhone("0542842721");
			user3.setRole("SchoolStaff");
			user3.setSocialId("445566778");
			user3.setStatus(true);
			usersService.createSystemUser(user3);
	
			Program program =new Program();
			program.setName("Math");
			program.setCost(20);
			program.setShortDescription("Math");
			program.setLongDescription("mathematics is the science");
			programService.addProgram(program, 1);
			
			Program program1 =new Program();
			program1.setName("Robotics");
			program1.setCost(20);
			program1.setShortDescription("Introduction to hi-tech");
			program1.setLongDescription("The students will acquire knowldege about hi-tech in general and Robotics in specifics");
			programService.addProgram(program1, 1);
			
			Program program2 =new Program();
			program2.setName("Art");
			program2.setCost(70);
			program2.setShortDescription("Color and Shape");
			program2.setLongDescription("The students will acquire background in arts history and will experience colors and shapes");
			programService.addProgram(program2, 1);
		
		}
		catch(Exception e )
		{
			
		}

	}
	

}
