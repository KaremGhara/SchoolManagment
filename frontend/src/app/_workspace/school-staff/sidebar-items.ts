import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const schoolStaffRoute: RouteInfo[] =[

    {
        path: '',
        title: 'Students',
        moduleName: 'schoolstaff',
        iconType: 'material-icons-two-tone',
        icon: 'person',
        class: 'menu-toggle',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [UserRole[UserRole.SchoolStaff]],
        submenu: [
            {
                path: '/workspace/school-staff/all/2/אלאחוה',
                title: 'Show Students',
                moduleName: 'schoolstaff',
                iconType: '',
                icon: '',
                class: 'ml-menu',
                groupTitle: false,
                badge: '',
                badgeClass: '',
                role: [''],
                submenu: [],
              },
              {
                path: '/workspace/school-staff/attach',
                title: 'Attach Students',
                moduleName: 'schoolstaff',
                iconType: '',
                icon: '',
                class: 'ml-menu',
                groupTitle: false,
                badge: '',
                badgeClass: '',
                role: [''],
                submenu: [],
              },
        ],
    }
]