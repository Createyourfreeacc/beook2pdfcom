import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: '📚',
      title: 'Extract HTML/CSS Content',
      description: 'Extracts raw HTML/CSS content from the Beook SQLite database'
    },
    {
      icon: '📄',
      title: 'Convert to PDF',
      description: 'Converts book pages to PDF using Puppeteer for high-quality output'
    },
    {
      icon: '🔓',
      title: 'Decrypt Quiz Content',
      description: 'Decrypts quiz questions and answers from protected content'
    },
    {
      icon: '🌐',
      title: 'Modern Web Interface',
      description: 'Browse and select books from your Beook library with a beautiful UI'
    }
  ];

  testedCourses = [
    '978-3-905036-87-9',
    '978-3-03901-007-3',
    '978-3-905036-95-4',
    '978-3-03901-002-8',
    '978-3-03901-000-4',
    '978-3-03901-011-0',
    '978-3-03901-004-2',
    '978-3-03901-003-5',
    '978-3-905036-94-7',
    '978-3-905036-96-1',
    '978-3-03901-015-8',
    '978-3-905036-88-6'
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

