import {Component, HostListener, OnInit} from '@angular/core';

let nightSection = document.getElementById('night-section');
let bounding = nightSection?.getBoundingClientRect();

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    public colorEnvironment = "dark";
    public mobileNavbarActive: boolean = false;

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        nightSection = document.getElementById('night-section');
        bounding = nightSection?.getBoundingClientRect();

        this.determineColorEnvironment();
    }

    determineColorEnvironment(): void {
        this.colorEnvironment = (bounding!.bottom >= (document.documentElement.clientHeight - nightSection!.clientHeight + 225))
            ? "dark"
            : "light";
    }

    toggleMobileNavbar(): void {
        this.mobileNavbarActive = !this.mobileNavbarActive;
    }

    toggleMobileNavbarOff(): void {
        this.mobileNavbarActive = false;
    }
}
