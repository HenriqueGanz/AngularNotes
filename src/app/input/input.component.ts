import { Component } from '@angular/core';

@Component ({
    selector: 'Input',
    template: `
    <label for="login">Login</label>

    <input type="text" id="login" name="login" required
       minlength="4" maxlength="8">`
})
export class InputComponent {

}