import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // phrases: string[] = ['Nottingham Arts', 'Not Art', 'Not Music', 'Not Literature', 'Not Theatre'];
  // currentIndex: number = 0; // Index for cycling through phrases
  // scrambledTitle: string = '';
  // originalText: string = '';
  // scrambleDuration: number = 150; // milliseconds
  // unscrambleDuration: number = 1500; // milliseconds

  // characters: string = '!<>-_\\/[]{}—=+*^?#________'; // Characters for scrambling

  constructor(private routerService: Router) {}

  ngOnInit(): void {
    // this.originalText = this.phrases[this.currentIndex];
    // this.startScrambling();
  }

  // Updated function to scramble using the new set of characters
  // scrambleText(): string {
  //   return this.originalText.split('').map(() => {
  //     const randomChar = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
  //     return randomChar;
  //   }).join('');
  // }

  // Function to scramble the current phrase
  // scrambleTitle(): void {
  //   this.scrambledTitle = this.scrambleText();
  // }

  // Function to unscramble the current phrase correctly
  // unscrambleTitle(): void {
  //   let currentText = this.scrambledTitle.split('');
  //   let index = 0;

    // const interval = setInterval(() => {
      // Make sure we're only replacing the characters that need to be restored
  //     currentText[index] = this.originalText[index];
  //     this.scrambledTitle = currentText.join('');
  //     index++;
  //     if (index === this.originalText.length) {
  //       clearInterval(interval); // Stop once the entire text is unscrambled
  //     }
  //   }, 50);
  // }

  // Function to cycle through phrases and scramble/unscramble
  // startScrambling(): void {
  //   const cycleInterval = setInterval(() => {
  //     if (this.currentIndex < this.phrases.length - 1) {
  //       this.originalText = this.phrases[this.currentIndex];
  //       this.scrambleTitle();
        
  //       setTimeout(() => {
  //         this.unscrambleTitle();
  //       }, this.scrambleDuration);
        
  //       this.currentIndex++;
  //     } else {
        // When we reach the last phrase, end with 'Not Art'
        // this.originalText = 'Not Art';
        // this.scrambleTitle();
        // setTimeout(() => {
        //   this.unscrambleTitle();
        // }, this.scrambleDuration);
        
        // clearInterval(cycleInterval); // Stop cycling after last phrase
      }
  //   }, this.scrambleDuration + this.unscrambleDuration);
  // }
// }
