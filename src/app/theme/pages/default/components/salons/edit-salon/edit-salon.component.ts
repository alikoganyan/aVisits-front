import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {CreateSalonService} from "../../../../../_services/create-salon.service";


@Component({
  selector: 'app-edit-salon',
  templateUrl: './edit-salon.component.html',
  styleUrls: ['./edit-salon.component.css']
})
export class EditSalonComponent implements OnInit, AfterViewInit {
  salon: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private _script: ScriptLoaderService,
              private createSalonService: CreateSalonService) { }

  ngOnInit() {
    // this.createSalonService.selectedSalon.subscribe(
    //     (response: any) => {
    //       this.salon = response
    //     }
    // )
  }

    backToAllSalons() {
        // this.router.navigate(['/components/salons/all-salons'], { relativeTo: this.route })
    }

    ngAfterViewInit() {
        this._script.load(
            'app-edit-salon',
            'assets/vendors/custom/gmaps/gmaps.js',
            'assets/demo/default/custom/components/maps/create-new-salon-google-map.js',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
    }


}
