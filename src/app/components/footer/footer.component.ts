import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	window.addEventListener('scroll', this.scroll, true);    
  }

  ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

  scroll = (event): void => {
      var footer = document.getElementById("footer-animation");

      var viewOffset = window.pageYOffset;

      //Active animations
      //Footer
      var offSetFooter = footer.offsetTop;
      
      if (offSetFooter - viewOffset <= 550) {
        footer.classList.add("opacity-effect");
        footer.classList.remove("hidden");
        footer.classList.add("visible");
      }
  };

}
