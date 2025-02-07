import {Transform} from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto{

    @IsString()     //Validator
    @IsNotEmpty()
    name: String

    @IsEmail()
    @IsNotEmpty()
    email:String

    @IsString()
    @IsNotEmpty()
    password:String

    @IsString()
    @IsNotEmpty()
    mobile: String

    @IsString()
    @IsNotEmpty()
    gender:String;

    @Transform(({value}) => value && new Date(value))
    date_of_birth: Date
}