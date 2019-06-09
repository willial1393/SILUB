import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable()
export class AppGlobals {
    base_url = environment.apiEndPoint;
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    datePipe = new DatePipe('en-US');

    getCurrentDate() {
        return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    formatDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    isValidDate(date) {
        return !isNaN(Date.parse(date));
    }

    errorUPS(res) {
        // if (environment.production) {
        //     swal(
        //         '¡Ups!',
        //         'Algo salió mal de nuestro lado',
        //         'error'
        //     );
        // } else {
            swal(
                '¡Ups!',
                res['message'],
                'error'
            );
        // }
    }

}
