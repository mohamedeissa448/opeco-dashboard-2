import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    constructor(private toastr: ToastrService) {
    }

    ngOnInit() {
        let that = this;
        setTimeout(function () {
            that.showToastr();
        }, 1000);
        
    }

    ngOnDestroy(){
    }
    showToastr() {
        this.toastr.info('Hello, welcome to Lucid, a unique admin Template.', undefined, {
            closeButton: true,
            positionClass: 'toast-top-right',
            timeOut: 2000,
        });
    }

    
}
