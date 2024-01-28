import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../core/header/header.component';
import { ClimateContainerComponent } from '../../components/climate-container/climate-container.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { RouterOutlet, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ClimateContainerComponent, title: 'Dashboard'},
];

@Component({
  selector: 'dashboard-container',
  standalone: true,
  
  imports: [HeaderComponent, ClimateContainerComponent, SideBarComponent, RouterOutlet, ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {

}
