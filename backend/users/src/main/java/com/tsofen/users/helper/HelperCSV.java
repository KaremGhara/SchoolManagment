
package com.tsofen.users.helper;

import java.io.InputStream;  
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Student;
import com.tsofen.users.beans.User;
import com.tsofen.users.repos.ClassroomRepo;

import lombok.Data;




public class HelperCSV {
	
	
	@Autowired
	ClassroomRepo classRoomRepo;
	
	
	


public static boolean checkFormatCSV(MultipartFile file) {
		String contentType=file.getContentType();

	assert contentType != null;
	return contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	}


//public  Classroom getClassByGradeAndOrdinal(String grade,String ordinalNumber) {
//	Classroom exsitingClassRoom=classRoomRepo.findByGradeAndOrdinalNumber(grade, ordinalNumber);
//	return exsitingClassRoom;
//	}
//	


public  List<Student> convertExcelToStudent(InputStream inputStram){
    List<Student> list = new ArrayList<Student>();
	try(XSSFWorkbook workBook= new XSSFWorkbook(inputStram)){
		
		XSSFSheet sheet = workBook.getSheetAt(0);
		for (int index = 0; index < sheet.getPhysicalNumberOfRows(); index++) {
			
            if (index > 0) {
               Student student = new Student();
               Classroom classRoom = new Classroom();
                XSSFRow row = sheet.getRow(index);
                //Define
                String fullName=row.getCell(0).getStringCellValue();
                String fName=row.getCell(34).getStringCellValue();
                String classR=row.getCell(31).getStringCellValue();
                String classRoomNum= String.valueOf(classR);                
                
                
                int socialId=(int)row.getCell(32).getNumericCellValue();
                String socialIdNum=String.valueOf(socialId);
                 
                //Splits
                String splitName[]=fullName.split(" ");
                String splitClassR[]=classRoomNum.split("-");
//                Classroom exsitingClassRoom=classRoomRepo.findByGradeAndOrdinalNumber("1", "א");
                
               
//                classRoom=getClassByGradeAndOrdinal(splitClassR[0], splitClassR[1]);
                	if(splitName.length>2) {
                		student.setFirstName(splitName[0]+" "+splitName[1]);
                        student.setLastName(splitName[2]);
                	}
                	else {
                		student.setFirstName(splitName[1]);
                        student.setLastName(splitName[0]);
                	}
                	
                	
                
                
                //Sets
                
                student.setSocialId(socialIdNum);
                classRoom.setGrade(splitClassR[0]);
                classRoom.setOrdinalNumber(splitClassR[1]);
                
                student.setClassroom(classRoom);
                list.add(student);
            
            }
	}
	}
	catch (Exception e) {
		e.printStackTrace();
	}
	return list;
	
}

	public static List<User> loadUsersDataFromExcelToUserObject(InputStream inputStram){
		List<User> list = new ArrayList<>();

		try(XSSFWorkbook workBook= new XSSFWorkbook(inputStram)){

			XSSFSheet sheet = workBook.getSheetAt(0);



			int rowNum=0;
			for (Row row : sheet) {
				if (rowNum == 0) {
					rowNum++;
					continue;
				}
				Iterator<Cell> cells = row.iterator();

				int cid = 0;
				User user = new User();

				while (cells.hasNext()) {
					Cell cell = cells.next();
					switch (cid) {
						case 0:
							user.setFname(cell.getStringCellValue());
							break;
						case 1:
							user.setLname(cell.getStringCellValue());
							break;
						case 2:
							user.setSocialId(cell.getStringCellValue());
							break;
						case 3:
							user.setEmail(String.valueOf(cell.getCellStyle()));
							break;
						case 4:
							user.setPhone(String.valueOf(cell.getCellStyle()));
							break;
						case 5:
							user.setRole(String.valueOf(cell.getCellStyle()));
							break;
						case 6:
							user.setStatus(Boolean.parseBoolean(String.valueOf(cell.getCellStyle())));
							break;
						default:
							break;
					}
					cid++;
				}
				list.add(user);

			}


		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}
}
