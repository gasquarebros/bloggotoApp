import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-static',
  templateUrl: './static.page.html',
  styleUrls: ['./static.page.scss'],
})
export class StaticPage implements OnInit {

  public section: any = '';
  public pageHeading: any = '';
  public pageContent: any = '';
  public reqOpts;

  constructor(private route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.section = (this.route.snapshot.queryParamMap['params'].section !== undefined) ?
    this.route.snapshot.queryParamMap['params'].section : '';
    this.getData();
  }

  async getData() {
    if (this.section !== '') {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.api.getStaticData('api/page?page=' + this.section, this.reqOpts).subscribe(res => {
        loading.dismiss();
        this.pageHeading = res[0].data.cmspage_title;
        this.pageContent = res[0].data.cmspage_description;
      }, err => {
        console.log(err);
        loading.dismiss();
      });
      /*
      this.api.getStaticDatas('api/page?page=' + this.section).then((res) => {
        console.log(res);
        loading.dismiss();
        this.pageHeading = res[0].data.cmspage_title;
        this.pageContent = res[0].data.cmspage_description;
      }, err => {
        console.log(err);
        loading.dismiss();
      });*/
    } else {
      this.pageHeading = 'Page Not Found';
      this.pageContent = 'Page Not Found';
    }
  }

}
