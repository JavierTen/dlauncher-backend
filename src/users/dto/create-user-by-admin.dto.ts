import { IsEmail, IsNotEmpty, IsString, Length, IsNumberString, IsDate } from "class-validator"


export class CreateUserByAdminDto {
    

    @IsEmail({}, { message: 'Correo electrónico inválido' })
    @IsNotEmpty()
    @Length(1, 40, { message: 'El correo electrónico debe tener entre 1 y 40 caracteres' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Los nombres deben tener entre 3 y 20 caracteres' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Los apellidos deben tener entre 3 y 20 caracteres' })
    lastname: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(5, 20, { message: 'El número de documento debe tener entre 5 y 20 caracteres' })
    document: number;

    @IsNotEmpty()    
    birthday: Date;

    @IsNotEmpty()
    @IsNumberString()
    @Length(5, 10, { message: 'El numero de celular debe tener entre 5 y 10 caracteres' })
    cellphone: number;

    documentTypeId: number
    
    municipalityId: number;

    roleId: number;
}
