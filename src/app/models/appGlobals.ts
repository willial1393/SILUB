import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {DatePipe} from '@angular/common';

@Injectable()
export class AppGlobals {
    delvelopment = true;
    // token = '123456789';
    base_url = 'http://localhost/SILUB/api/public/';
    // base_url = 'https://kitsune1393.000webhostapp.com/SILUB/api/public/';
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

    errorUPS(res) {
        if (this.delvelopment) {
            swal(
                '¡Ups!',
                res['message'],
                'error'
            );
        } else {
            swal(
                '¡Ups!',
                'Algo salió mal de nuestro lado',
                'error'
            );
        }
    }

}
