import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scramble-header',
  imports: [],
  templateUrl: './scramble-header.component.html',
  styleUrl: './scramble-header.component.css'
})
export class ScrambleHeaderComponent implements OnInit {
phrases: string[] = ['Nottingham Arts', 'Not Art', 'Not Music', 'Not Literature', 'Not Theatre'];
  currentIndex: number = 0; 
  scrambledTitle: string = '';
  originalText: string = '';
  scrambleDuration: number = 150; 
  unscrambleDuration: number = 1500; 

  characters: string = '!<>-_\\/[]{}—=+*^?#________'; 

  ngOnInit(): void {
    this.originalText = this.phrases[this.currentIndex];
    this.startScrambling();
  }

  scrambleText(): string {
    return this.originalText.split('').map(() => {
      const randomChar = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      return randomChar;
    }).join('');
  }

  scrambleTitle(): void {
    this.scrambledTitle = this.scrambleText();
  }

  unscrambleTitle(): void {
    let currentText = this.scrambledTitle.split('');
    let index = 0;

  const interval = setInterval(() => {
      currentText[index] = this.originalText[index];
      this.scrambledTitle = currentText.join('');
      index++;
      if (index === this.originalText.length) {
        clearInterval(interval); 
      }
    }, 50);
  }

  startScrambling(): void {
    const cycleInterval = setInterval(() => {
      if (this.currentIndex < this.phrases.length - 1) {
        this.originalText = this.phrases[this.currentIndex];
        this.scrambleTitle();

        setTimeout(() => {
          this.unscrambleTitle();
        }, this.scrambleDuration);

        this.currentIndex++;
      } else {
  this.originalText = 'Not Art';
  this.scrambleTitle();
  setTimeout(() => {
    this.unscrambleTitle();
  }, this.scrambleDuration);

  clearInterval(cycleInterval);
}
  }, this.scrambleDuration + this.unscrambleDuration);
}
}
