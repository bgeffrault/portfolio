import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/project/project.module';
import { ProjectServicesService } from '../../services/project-services.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  project : Project;

  constructor(private projectsService: ProjectServicesService,
          private router: Router,
          private route: ActivatedRoute  ) { 
 }

  ngOnInit() {
  	window.scrollTo(0,0);
  	const id = this.route.snapshot.params['id'];
  	this.projectsService.getSingleProject(+id).then(
      (projectI: Project) => {
        this.project = projectI;
        console.log("This project : " + this.project.title)
      }
    );
  }

}
