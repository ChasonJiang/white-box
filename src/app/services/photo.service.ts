import { Injectable } from '@angular/core';
import { Camera, CameraResultType,ImageOptions } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePicture (imageOptions?:ImageOptions){
    if (imageOptions===undefined){
      imageOptions = {
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      }
    }
    const image = await Camera.getPhoto(imageOptions);
    return  image.dataUrl;
  };
}
