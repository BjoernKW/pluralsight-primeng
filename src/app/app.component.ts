import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Menu } from "primeng/menu";
import {Router} from "@angular/router";
import { MenuItem } from 'primeng/api';

declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];

  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router) {

  }

  ngOnInit() {

    let handleSelected = function(event) {
      let allMenus = jQuery(event.originalEvent.target).closest('ul');
      let allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass("menu-selected");
      let selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    }

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event)},
      {label: 'All Times', icon: 'fa fa-calendar', routerLink: ['/alltimes'], command: (event) => handleSelected(event)},
      {label: 'My Timesheet', icon: 'fa fa-clock-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event)},
      {label: 'Add Project', icon: 'fa fa-tasks', routerLink: ['/projects'], command: (event) => handleSelected(event)},
      {label: 'My Profile', icon: 'fa fa-users', routerLink: ['/profile'], command: (event) => handleSelected(event)},
      {label: 'Settings', icon: 'fa fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event)},
    ]

    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })

  }

  selectInitialMenuItemBasedOnUrl() {
    let path = document.location.pathname;
    let menuItem = this.menuItems.find( (item) => { return item.routerLink[0] == path });
    if (menuItem) {
      let iconToFind = '.' + menuItem.icon.replace('fa ', ''); // make fa fa-home into .fa-home
      let selectedIcon = document.querySelector(`${iconToFind}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }

  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }



}
