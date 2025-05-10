import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ImageService} from './image.service';
import {BlogImage} from '@shared/components/image-selector/blog-image.model';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-image-selector',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {
  allImage$?: Observable<BlogImage[]>;
  fileName: string = '';
  title: string = '';
  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;
  private file?: File;

  constructor(private imageService: ImageService) {
  }


  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (!(this.file && this.fileName !== '' && this.title !== '')) {
      return;
    }

    this.imageService.uploadImage(this.file, this.title, this.fileName).subscribe({
      next: () => {
        this.getImages();
        this.imageUploadForm?.resetForm()
      },
      error: (error) => console.log(error)
    })
  }

  selectImage(image: BlogImage) {
    this.imageService.selectImage(image);
  }

  private getImages(): void {
    this.allImage$ = this.imageService.getAll();
  }
}
