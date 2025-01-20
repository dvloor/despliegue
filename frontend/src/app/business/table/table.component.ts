import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone:true,
  imports: [RouterLink, RouterModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export default class tableComponent{
}
