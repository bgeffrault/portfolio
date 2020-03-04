import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project/project.module';
import { ProjectServicesService } from '../../services/project-services.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  projectsList : Project[] = [];
  projectsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, 
  			  private postsService: ProjectServicesService,
              private router: Router) { }

  ngOnInit() {
  	this.initForm();

    this.projectsSubscription = this.postsService.postsSubject.subscribe(
      (projects: Project[]) => {
        this.projectsList = projects;
      }
    );
     var promise = new Promise((resolve, reject) => {
        this.postsService.getProjects();
        console.log("Get projects in progress ");
        resolve();
      });
     
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      skills: ['', Validators.required],
      complete: ['',],
    });
  }

  onUploadFile(file: File) {
      this.fileIsUploading = true;
      this.postsService.uploadFile(file).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
  }


  detectFiles(event) {
    //Send data to server
      this.onUploadFile(event.target.files[0]);
  }

  onSavePost() {

    var newPost = new Project();
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const skills = this.postForm.get('skills').value;
    const complete = this.postForm.get('complete').value;

    newPost.skills = skills.split(', ');
    newPost.title = title;
    newPost.content = content;
    const date = new Date();
    newPost.created_at = date.toString();
    newPost.complete = complete;

    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    this.postsService.creatNewPost(newPost);
    this.router.navigate(['']);

  }

}



