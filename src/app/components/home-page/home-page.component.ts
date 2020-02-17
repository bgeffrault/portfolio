import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectServicesService } from '../../services/project-services.service';
import { Project } from '../../models/project/project.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  circle : String[];
  projectsList : Project[] = [];
  projectsSubscription: Subscription;

  constructor(
          private projectsService: ProjectServicesService,
          private router: Router 
    ) { 
  }

  ngOnInit() {
  	window.addEventListener('scroll', this.scroll, true);
    window.scrollTo(0,0);

    this.projectsSubscription = this.projectsService.postsSubject.subscribe(
      (projects: Project[]) => {
        this.projectsList = projects;
      }
    );
     var promise = new Promise((resolve, reject) => {
        this.projectsService.getProjects();
        console.log("Get projects in progress ");
        resolve();
      });
    
  }

  ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

  scroll = (event): void => {
      var header = document.getElementById("header");
      var navbar = document.getElementById("myTopnav");
      var about = document.getElementById("about");
      var aboutLine = document.getElementById("AboutLine");
      var homeNav = document.getElementById("homeNav");
      var aboutNav = document.getElementById("aboutNav");
      var portfolioNav = document.getElementById("portfolioNav");
      var contactNav = document.getElementById("contactNav");
      var skillsWrapper = document.getElementById("skills-wrapper");
      var portfolioElements = document.getElementById("Portfolio-elements");
      var portfolioProjects = document.getElementById("Portfolio-projects");
      var portfolio = document.getElementById("projectsContainer");
      


      var viewOffset = window.pageYOffset;
      
      //Sticky navbar
      var offSetNavbar = header.offsetHeight;
      if (viewOffset >= offSetNavbar) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }

      //Active animations
      //About
      if (viewOffset >= 190) {
        about.classList.add("opacity-effect");
        about.classList.remove("hidden");
        about.classList.add("visible");
        aboutLine.classList.add("opacity-effect");
        aboutLine.classList.remove("hidden");
        aboutLine.classList.add("visible");
      }

      if(viewOffset >= 280){
        skillsWrapper.classList.add("opacity-effect");
        skillsWrapper.classList.remove("hidden");
        skillsWrapper.classList.add("visible");
      }

      //Portfolio offset
      if(viewOffset >= 710){
        portfolioElements.classList.add("opacity-effect");
        portfolioElements.classList.remove("hidden");
        portfolioElements.classList.add("visible");
      }

      if(viewOffset >= 800){
        portfolioProjects.classList.add("opacity-effect");
        portfolioProjects.classList.remove("hidden");
        portfolioProjects.classList.add("visible");
      }

      //NavBar active view management
      var offsetAbout = about.offsetTop - navbar.offsetHeight;
      var offsetPortfolio = portfolio.offsetTop - navbar.offsetHeight;
      var offsetContact = portfolio.offsetTop + portfolio.offsetHeight;
      var offsetViewBottom = viewOffset + window.innerHeight;
      /*
      console.log("About offset =" + offsetAbout +
                  " Portfolio offset = " + offsetPortfolio +
                  " Contact offset d + c = " + offsetContact +
                  " View offset = " + viewOffset + 
                  " Bottom offset a + b = " + offsetViewBottom );*/

      if(viewOffset+25<=offsetAbout){
        //Home view
        homeNav.classList.add("active");
        aboutNav.classList.remove("active"); 
        portfolioNav.classList.remove("active");
        contactNav.classList.remove("active");  

      } else if (viewOffset +25>=offsetAbout && viewOffset+1<=offsetPortfolio){
        //About view
        aboutNav.classList.add("active");
        homeNav.classList.remove("active"); 
        portfolioNav.classList.remove("active");
        contactNav.classList.remove("active"); 
      }  else if ( viewOffset+1>=offsetPortfolio ){
        //Portfolio view
        portfolioNav.classList.add("active");
        homeNav.classList.remove("active"); 
        aboutNav.classList.remove("active");
        contactNav.classList.remove("active"); 
      }

      //Stars overflowing management
      if (viewOffset >= offsetAbout) {
        //Remove the overflowing stars on the others elements
        header.classList.add("hidden");
      } else {
        //Add the stars again on the others elements
        header.classList.remove("hidden");
      }
    };

    goToHome(){
      var x = 0;
      var y = 0;
      var homeNav = document.getElementById("homeNav");
      var aboutNav = document.getElementById("aboutNav");
      var portfolioNav = document.getElementById("portfolioNav");
      var contactNav = document.getElementById("contactNav");
      
      window.window.scrollTo(x, y);  

      homeNav.classList.add("active");
      aboutNav.classList.remove("active"); 
      portfolioNav.classList.remove("active");
      contactNav.classList.remove("active");
    }

    goToAbout(){
      var navbar = document.getElementById("myTopnav");
      var about = document.getElementById("aboutContainer");
      var x = 0;
      var y = about.offsetTop - navbar.offsetHeight;
      var homeNav = document.getElementById("homeNav");
      var aboutNav = document.getElementById("aboutNav");
      var portfolioNav = document.getElementById("portfolioNav");
      var contactNav = document.getElementById("contactNav");
      
      window.window.scrollTo(x, y);  

      aboutNav.classList.add("active");
      homeNav.classList.remove("active"); 
      portfolioNav.classList.remove("active");
      contactNav.classList.remove("active");  
    }

    goToPortfolio(){
      var navbar = document.getElementById("myTopnav");
      var portfolio = document.getElementById("projectsContainer");
      var x = 0;
      var y = portfolio.offsetTop - navbar.offsetHeight;
      var homeNav = document.getElementById("homeNav");
      var aboutNav = document.getElementById("aboutNav");
      var portfolioNav = document.getElementById("portfolioNav");
      var contactNav = document.getElementById("contactNav");
      
      window.window.scrollTo(x, y);  

      portfolioNav.classList.add("active");
      homeNav.classList.remove("active"); 
      aboutNav.classList.remove("active");
      contactNav.classList.remove("active"); 
    }

    goToContact(){
      var navbar = document.getElementById("myTopnav");
      var portfolio = document.getElementById("projectsContainer");
      var x = 0;
      var y = portfolio.offsetTop + portfolio.offsetHeight;

      var homeNav = document.getElementById("homeNav");
      var aboutNav = document.getElementById("aboutNav");
      var portfolioNav = document.getElementById("portfolioNav");
      var contactNav = document.getElementById("contactNav");

      window.window.scrollTo(x, y);  

      contactNav.classList.add("active");
      homeNav.classList.remove("active"); 
      aboutNav.classList.remove("active");
      portfolioNav.classList.remove("active"); 
    }
}
