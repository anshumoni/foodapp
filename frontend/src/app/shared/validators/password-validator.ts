import { AbstractControl } from "@angular/forms"

export const PasswordMatchValidator=((passwordControlName:string,confirmpasswordControlName:string)=>{
    let validator = (form:AbstractControl)=>{
        let passwordControl = form.get(passwordControlName)
        let conpasswordControl = form.get(confirmpasswordControlName)
        if(!passwordControl || !conpasswordControl) return

        if(passwordControl.value!==conpasswordControl.value){
            conpasswordControl.setErrors({notmatch:true})
        }else{
            let errors = conpasswordControl.errors;
            if(!errors) return;
            delete errors['notmatch'];
            conpasswordControl.setErrors(errors)
        }
    }
    return validator;
})