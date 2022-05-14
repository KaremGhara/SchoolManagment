import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { schoolStaffRoute } from '../../_workspace/school-staff/sidebar-items';
import {programManagerRoute} from '../../_workspace/program-manager/sidebar-items';
import {AdminRoute} from '../../_workspace/system-admin/sidebar-items';
import {MunicipalityManagerRoute} from '../../_workspace/mincipality-manager/sidebar-items'
import {schoolRoute}  from '../../_workspace/school/sidebar-items';
import {ROUTES} from './sidebar-items'
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserServiceService } from 'src/app/_workspace/services/user-service.service';
import { UserRole } from 'src/app/_workspace/common-utils/classes/user-role';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  level1Menu = '';
  level2Menu = '';
  level3Menu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private usersService : UserServiceService,
    private router: Router
  ) {
    const body = this.elementRef.nativeElement.closest('body');
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // logic for select active menu in dropdown
        const role = ['admin', 'teacher', 'student'];
        const currenturl = event.url.split('?')[0];
        const firstString = currenturl.split('/').slice(1)[0];

        if (role.indexOf(firstString) !== -1) {
          this.level1Menu = currenturl.split('/')[2];
          this.level2Menu = currenturl.split('/')[3];
        } else {
          this.level1Menu = currenturl.split('/')[1];
          this.level2Menu = currenturl.split('/')[2];
        }
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = '0';
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = '0';
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = '0';
    } else {
      this.level3Menu = element;
    }
  }
  //ROUTES:any[]=[]
  ngOnInit() {
    const storedItems=localStorage.getItem('currentUser')
    console.log(storedItems);
    
    alert(this.usersService.loggedInUser.firstName)
    ROUTES.length = 0;
    for(let link of schoolStaffRoute)
    {
      ROUTES.push(link);
    }

    for(let link of programManagerRoute)
    {
      ROUTES.push(link);
    }
    for(let link of AdminRoute)
    {
      ROUTES.push(link);
    }
    for(let link of MunicipalityManagerRoute)
    {
      ROUTES.push(link);
    }
    for(let link of schoolRoute)
    {
      ROUTES.push(link);
    }
    
    
    if (this.usersService.loggedInUser) {
      const userRole = this.usersService.loggedInUser.role;
      this.userFullName =
        this.usersService.loggedInUser.firstName +
        ' ' +
        this.usersService.loggedInUser.lastName;
      
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf(userRole) !== -1 
        );
       this.userType = userRole;

       /* if (userRole === UserRole.SchoolStaff) {
          this.userType = UserRole.SchoolStaff;
        } else if (userRole === UserRole.ProgramManager) {
          this.userType = UserRole.ProgramManager;
        } else if (userRole === UserRole.MuncipalityManager) {
          this.userType = Role.MuncipalityManager;
        } else {
          this.userType = Role.Admin;
        }*/
      
   
    
}
  

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
