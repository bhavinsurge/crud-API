import {Transform} from "class-transformer";
import { IsEmail, IsString } from "class-validator";


export class UpdateUserDto{

    @IsString()     //Validator
    name: String

    @IsEmail()
    email:String

    @IsString()
    password:String

    @IsString()
    mobile: String

    @IsString()
    gender:String;

    @Transform(({value}) => value && new Date(value))
    date_of_birth: Date
}