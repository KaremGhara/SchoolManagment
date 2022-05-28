import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const schoolStaffRoute: RouteInfo[] =[

    {
        path: '',
        title: 'menu',
        moduleName: 'schoolstaff',
        iconType: 'material-icons-two-tone',
        icon: 'person',
        class: 'menu-toggle',
        groupTitle: true,
        badge: '',
        badgeClass: '',
        role: [UserRole[UserRole.SchoolStaff]],
        submenu: [],
    },
    // all students by select class room
    {
      path: '/workspace/school-staff/allClassesRoomsInSchoolStaff',
      title: 'Show Classes Rooms',
      moduleName: 'schoolstaff',
      iconType: 'material-icons-two-tone',
      icon: 'person',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      role: [UserRole[UserRole.SchoolStaff]],
      submenu: [],
    },
    //another choose option to all students
    // {
    //   path: '/workspace/school-staff/allStudents',
    //   title: 'Show Students',
    //   moduleName: 'schoolstaff',
    //   iconType: 'material-icons-two-tone',
    //   icon: 'person',
    //   class: '',
    //   groupTitle: false,
    //   badge: '',
    //   badgeClass: '',
    //   role: [UserRole[UserRole.SchoolStaff]],
    //   submenu: [],
    // },
    {
      path: '/workspace/school-staff/attach',
      title: 'Attach Students',
      moduleName: 'schoolstaff',
      iconType: 'material-icons-two-tone',
      icon: 'person',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      role: [UserRole[UserRole.SchoolStaff]],
      submenu: [],
    },
    {
      path: '/workspace/school/allPrograms',
      title: 'Show Programs',
      moduleName: 'school',
      iconType: 'material-icons-two-tone',
      icon: 'layers',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      role: [UserRole[UserRole.SchoolStaff]],
      submenu: [],
    },
    {
      path: '/workspace/school-staff/linkProgramsToSchool',
      title: 'Link program to school',
      moduleName: 'schoolstaff',
      iconType: 'material-icons-two-tone',
      icon: 'layers',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      role: [UserRole[UserRole.SchoolStaff]],
      submenu: [],
    },

]