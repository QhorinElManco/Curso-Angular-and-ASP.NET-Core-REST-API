import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {BlogImage} from '@shared/components/image-selector/blog-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlBase: string = environment.urlBase;
  private urlImages: string = `${this.urlBase}/api/image`;
  private selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    title: '',
    fileName: '',
    fileExtension: '',
    url: '',
    createdOn: new Date()
  });


  constructor(private http: HttpClient) {
  }


  uploadImage(file: File, title: string, fileName: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('fileName', fileName);
    return this.http.post<BlogImage>(this.urlImages, formData);
  }

  getAll(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(this.urlImages);
  }

  selectImage(image: BlogImage) {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }

}
