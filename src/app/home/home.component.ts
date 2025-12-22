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
  readonly downloadUrl = 'https://github.com/Createyourfreeacc/beook2pdf/releases';
  readonly githubUrl = 'https://github.com/Createyourfreeacc/beook2pdf';
  readonly currentYear = new Date().getFullYear();

  readonly benefits = [
    {
      icon: '🛡️',
      title: 'Keep access long-term',
      description:
        'A PDF archive isn’t tied to a platform or a changing licence model. If access changes later, your copy still opens.'
    },
    {
      icon: '📦',
      title: 'Use any device or reader',
      description:
        'Read on older Windows, Linux, tablets, or the e-reader you prefer. PDFs move with you — even to devices beook doesn’t support.'
    },
    {
      icon: '🗂️',
      title: 'Backup and organize',
      description:
        'Store your books alongside your notes, sync to your own cloud, version them, print them, and keep them organized in your workflow.'
    },
    {
      icon: '✍️',
      title: 'Make it yours',
      description:
        'Highlight, annotate, copy excerpts, and build your own study documents — within your rights and the content’s licence.'
    }
  ];

  readonly useCases = [
    {
      icon: '🎓',
      title: 'Students',
      description:
        'Keep course materials accessible across semesters, devices, and apps — and study on whatever you have available.'
    },
    {
      icon: '🧑‍🏫',
      title: 'Teachers and trainers',
      description:
        'Prepare lesson packs, print handouts, and annotate content while keeping an archive you can reuse year after year.'
    },
    {
      icon: '🧠',
      title: 'Lifelong learners',
      description:
        'Build a durable reference library for certifications, manuals, and learning content — independent from a single vendor.'
    }
  ];

  readonly steps = [
    {
      number: '1',
      title: 'Download the Windows app',
      description: 'Get the latest release and run it on Windows 10+.'
    },
    {
      number: '2',
      title: 'Pick a book from your library',
      description: 'Select what you want to archive or move to other devices.'
    },
    {
      number: '3',
      title: 'Export to PDF',
      description: 'Generate a portable PDF you can store, back up, or print.'
    },
    {
      number: '4',
      title: 'Read anywhere',
      description: 'Open the PDF in your preferred reader and move it to devices you own.'
    }
  ];

  readonly faqs = [
    {
      q: 'Is this the official beook app?',
      a: 'No. This is an independent open source project and is not affiliated with Ionesoft or beook.'
    },
    {
      q: 'Does beook already support offline reading?',
      a: 'Yes — and that’s great. Exporting to PDF is mainly about long‑term control and device freedom (not being tied to one app or licence model).'
    },
    {
      q: 'What can I do with the exported PDFs?',
      a: 'You can open them in standard PDF readers, move them between devices, and annotate or organize them like any other document.'
    },
    {
      q: 'Is it legal to export my books?',
      a: 'Only export content you have the right to export, and respect local laws and the content’s licence. This site is informational and does not provide legal advice.'
    },
    {
      q: 'Where are docs and issues?',
      a: 'On GitHub — the repo includes documentation and the issue tracker for questions and compatibility notes.'
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffsetPx = 84;
      const y = element.getBoundingClientRect().top + window.scrollY - navOffsetPx;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

