import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database/dist/index.cjs';
import { Project } from '../models/project/project.module';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectServicesService {

	constructor() {
  }

  project : Project[] = [];
  postsSubject = new Subject<Project[]>();

  emitProjects() {
		this.postsSubject.next(this.project);
	}

  getProjects() {
    firebase.database().ref('/project')
      .on('value', (data: DataSnapshot) => {
          this.project = data.val() ? data.val() : [];
          console.log("Projects from service : ", this.project);
          this.emitProjects();
        }
      );
  }

  getSingleProject(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/project/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  saveProject(){
    firebase.database().ref('/project').set(this.project);
    console.log('Date send');
  }

  creatNewPost(newPost: Project){
    this.project.push(newPost);
    this.saveProject();
    this.emitProjects();
  }

  deletePost(postTitle: string){
    const index = this.project.findIndex(element => element.title == postTitle);
    if(this.project[index].photo) {
      const storageRef = firebase.storage().refFromURL(this.project[index].photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }

    if (index > -1) {
       this.project.splice(index, 1);
    }
    this.saveProject();
    this.emitProjects();
  }


  uploadFile(file: File) {
      return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
            .child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }
      );
  }


}

