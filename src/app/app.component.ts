import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

interface QrCodeInterface {
  url: string,
  imagem: string | undefined,
  imgHeight: number,
  imgWidth: number,
  margin: number,
  width: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gerador de QrCode';
  dataJson: any = {};
  formulario: FormGroup;
  formValue!: QrCodeInterface;
  public qrCodeDownloadLink: SafeUrl = "";

  constructor(fb: FormBuilder) {

    this.formulario = fb.group({
      url: ["https://getbootstrap.com/docs/5.2/components/buttons"],
      imagem: [],
      imgHeight: [{value: 190, disabled: true}],
      imgWidth: [{value: 65, disabled: true}],
      margin: [0],
      width: [200]
    });

    this.formValue = this.formulario.value as QrCodeInterface;

    this.formulario.valueChanges.subscribe((res: QrCodeInterface) => {
      res.imagem = 
      res.imagem == undefined || 
        res.imagem == '' || 
        (res.imagem as string).length < 12 ||
        !(/http|assets/.test(res.imagem as string)) ? undefined : res.imagem;
      console.log(res)
      this.formValue = res;
    });

    this.formulario.get("imagem")?.valueChanges.subscribe((res: any) => {
      console.log(res)
      if (res != "" && /http|assets/.test(res) && (res as string).length >= 12){
        this.formulario.get("imgWidth")?.enable();
        this.formulario.get("imgHeight")?.enable();
      }
      else {
        this.formulario.get("imgWidth")?.disable();
        this.formulario.get("imgHeight")?.disable();
      }
    });
  }

  download(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
