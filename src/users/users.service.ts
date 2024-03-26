import { ConflictException, Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { UsersTeamsEvents } from '../users-team-event/entities/users-team-event.entity'
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { EventEvaluator } from 'src/event-evaluator/entities/event-evaluator.entity';
import { SaveEvaluatorDto } from 'src/event-evaluator/dto/save-event-evaluator.dto';




@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(UsersTeamsEvents) private uteRepository: Repository<UsersTeamsEvents>,
    @InjectRepository(EventEvaluator) private evaluatorRepository: Repository<EventEvaluator>
  ) { }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user)
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: user.email
        }
      })
      const documentFound = await this.userRepository.findOne({
        where: {
          document: user.document
        }
      })

      if (emailFound && documentFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (emailFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (documentFound) {
        throw new HttpException({
          ok: false,
          error: 'DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }



      newUser.password = await hash(newUser.password, 10)



      await this.userRepository.save(newUser)



      return newUser

    } catch (error) {

      throw error;
    }

  }

  async createByAdmin(user: CreateUserByAdminDto) {
    const newUser = this.userRepository.create(user)
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: user.email
        }
      })
      const documentFound = await this.userRepository.findOne({
        where: {
          document: user.document
        }
      })

      if (emailFound && documentFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (emailFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (documentFound) {
        throw new HttpException({
          ok: false,
          error: 'DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      const pass = await this.generatePassword();
      newUser.password = await hash(pass, 10)
      await this.userRepository.save(newUser)
      await this.sendRegistrationEmail(user.email, pass);

      return newUser

    } catch (error) {

      throw error;
    }

  }

  async generatePassword(): Promise<string> {
    const minLength = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const generateRandomCode = () => {
      let code = '';
      while (code.length < minLength) {
        const randomIndex = crypto.randomInt(0, characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };

    const ensureUpperCaseLetter = (code: string) => {
      if (!/[A-Z]/.test(code)) {
        const randomUpperCaseIndex = crypto.randomInt(0, code.length);
        const upperCaseLetter = characters.charAt(crypto.randomInt(0, 26));
        code = code.substring(0, randomUpperCaseIndex) + upperCaseLetter + code.substring(randomUpperCaseIndex + 1);
      }
      return code;
    };

    let code = generateRandomCode();
    code = ensureUpperCaseLetter(code);

    return code;
  }

  async sendRegistrationEmail(email: string, password: string) {
    const transporter = nodemailer.createTransport({
      // Configuración del servicio de correo electrónico
      service: 'gmail',
      auth: {
        user: 'eventos.fisi.upb@gmail.com',
        pass: 'abzzidntntyvuhgg',
      },
    });

    const htmlContent = `
  <!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>New Account Email Template</title>
      <meta name="description" content="New Account Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!-- 100% body table -->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <a href="https://20fisi.bucaramanga.upb.edu.co"  target="_blank">
                              <img width="150" src="https://i.ibb.co/SBLSLn0/email-logo.png"  >
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Cuenta creada
                                          </h1>
                                          <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                          Su cuenta ha sido creada en EVENTOS FISI. <br> A continuación se muestran sus credenciales generadas por el sistema, <br><strong>Por favor, cambie la contraseña inmediatamente después de iniciar sesión.</strong>.</p>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p
                                              style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                              
                                              <strong
                                                  style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Contraseña</strong>${password}
                                          </p>
  
                                          <a href="https://20fisi.bucaramanga.upb.edu.co/#/login"
                                              style="background:#ad3dff;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Iniciar sesión</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>20fisi.bucaramanga.upb.edu.co</strong> </p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  
  </html>
    `;

    const mailOptions = {
      from: 'EVENTOS FISI',
      to: email,
      subject: 'Registro exitoso',
      html: htmlContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: ', info.response);
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
    }
  }

  async findUsers(): Promise<Users[]> {
    try {
      return this.userRepository.find({
        select: ['name', 'lastname', 'avatar', 'email', 'id'],
        order: {
          id: 'DESC', // Ordenar por la columna 'id' en orden descendente
        },
        where: {
          role: { id: 1 }
        }
      });
    } catch (error) {
      throw error;
    }

  }

  async findEvaluators(): Promise<Users[]> {
    try {
      return this.userRepository.find({
        select: ['name', 'lastname', 'avatar', 'email', 'id'],
        order: {
          id: 'DESC', // Ordenar por la columna 'id' en orden descendente
        },
        where: {
          role: { id: 3 }
        }
      });
    } catch (error) {
      throw error;
    }

  }

  async getUserByEmail(mail: UpdateUserDto){
      
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: mail.email
        }
      })



      if (!user) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_NOT_FOUND'
        }, HttpStatus.NOT_FOUND);
      }

      const token = await this.generatePassword();
      user.token = token;
      await this.userRepository.save(user);
      await this.sendTokenEmail(user.email, token)
      return {
        ok: true,
        mail
      }

    } catch (error) {
      return error
    }

  }

  async generateToken(): Promise<string> {
    const minLength = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const generateRandomCode = () => {
      let code = '';
      while (code.length < minLength) {
        const randomIndex = crypto.randomInt(0, characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };

    const ensureUpperCaseLetter = (code: string) => {
      if (!/[A-Z]/.test(code)) {
        const randomUpperCaseIndex = crypto.randomInt(0, code.length);
        const upperCaseLetter = characters.charAt(crypto.randomInt(0, 26));
        code = code.substring(0, randomUpperCaseIndex) + upperCaseLetter + code.substring(randomUpperCaseIndex + 1);
      }
      return code;
    };

    let code = generateRandomCode();
    code = ensureUpperCaseLetter(code);

    return code;
  }

  async sendTokenEmail(email: string, token: string) {

    const transporter = nodemailer.createTransport({
      // Configuración del servicio de correo electrónico
      service: 'gmail',
      auth: {
        user: 'eventos.fisi.upb@gmail.com',
        pass: 'txshrvitywtjguro',
      },
    });

    const htmlContent = `
    <!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>New Account Email Template</title>
          <meta name="description" content="New Account Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!-- 100% body table -->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <a href="https://20fisi.bucaramanga.upb.edu.co"  target="_blank">
                                  <img width="150" src="https://i.ibb.co/SBLSLn0/email-logo.png"  >
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Cambiar contraseña
                                              </h1>
                                              <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                              Copia el token suministrado y pégalo en el campo correspondiente para poder realizar el cambio de contraseña de tu cuenta.</p>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p
                                                  style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                  
                                                  <strong
                                                      style="display: block; font-size: 13px; margin: 0px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Token</strong>${token}
                                              </p>
      
                                              
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>20fisi.bucaramanga.upb.edu.co</strong> </p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>
      
      </html>        
    `;

    const mailOptions = {
      from: 'EVENTOS FISI',
      to: email,
      subject: 'Token',
      html: htmlContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: ', info.response);
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
    }

    
    
  }

  async findById(idUser: number): Promise<Users | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: idUser
        }

      })

      if (user) {
        user.password = null;
        user.token = null;
      }
      return user

    } catch (error) {
      return error
    }

  }

  async findUserEvents(idUser) {
    try {
      const usuario = await this.uteRepository.find({
        where: {
          user: { id: idUser },
        },
        relations: ['user', 'team.event'], // Cargar relaciones necesarias
      });
  
      if (usuario.length === 0) {
        return {
          ok: false,
          msg: 'NO_EVENTS',
        };
      }
  
      const currentDate = new Date();
  
      const events = usuario.map(ute => {
        const { id, name, slug, startAt, endsAt } = ute.team.event;
        let status;
  
        if (startAt > currentDate) {
          status = 'Próximamente';
        } else if (startAt <= currentDate && endsAt >= currentDate) {
          status = 'En curso';
        } else {
          status = 'Finalizado';
        }
  
        return { id, name, slug, status };
      });
  
      return events;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con IDs ${id} no encontrado`);
    }

    // Si se proporciona un nuevo correo electrónico en el DTO de actualización
    if (updateUserDto.email) {
      // Verifica si el nuevo correo electrónico ya existe en otro usuario
      const existingUserByEmail = await this.userRepository.findOne({
        where: {
          email: updateUserDto.email,
          id: Not(id) // Excluye al usuario actual
        }
      });

      if (existingUserByEmail) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_CONFLICT'
        }, HttpStatus.CONFLICT);
      }
    }

    // Si se proporciona un nuevo número de documento en el DTO de actualización
    if (updateUserDto.document) {
      // Verifica si el nuevo número de documento ya existe en otro usuario
      const existingUserByDocument = await this.userRepository.findOne({
        where: {
          document: updateUserDto.document,
          id: Not(id) // Excluye al usuario actual
        }
      });

      if (existingUserByDocument) {
        throw new HttpException({
          ok: false,
          error: 'DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }
    }

    // Actualiza los campos proporcionados en updateUserDto
    Object.assign(user, updateUserDto);

    // Guarda los cambios en la base de datos
    await this.userRepository.save(user);

    return user;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con IDs ${id} no encontrado`);
    }

    // Verificar si la contraseña anterior es correcta
    const isPasswordValid = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña anterior incorrecta');
    }

    // Cifrar la nueva contraseña
    const hashedPassword = await hash(updatePasswordDto.newPassword, 10);

    // Actualizar la contraseña en el usuario
    user.password = hashedPassword;

    // Guardar los cambios en la base de datos
    await this.userRepository.save(user);

    return {
      ok: true,
      msg: 'Contraseña cambiada'
    }

  }

  async updatePasswordForgot(data: any) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
        token: data.token
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con email ${data.email} no encontrado`);
    }


    // Cifrar la nueva contraseña
    const hashedPassword = await hash(data.newPassword, 10);

    // Actualizar la contraseña en el usuario
    user.password = hashedPassword;

    // Guardar los cambios en la base de datos
    await this.userRepository.save(user);

    return {
      ok: true,
      msg: 'Contraseña cambiada'
    }

  }

  async countUsers(): Promise<number> {
    return this.userRepository.count({
      where: {
        role: {
          id: 1
        }
      }
    });
  }
  async countEvaluators(): Promise<number> {
    return this.userRepository.count({
      where: {
        role: {
          id: 3
        }
      }
    });
  }

  async deleteUserById(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return false; // El usuario no existe
    }

    await this.userRepository.remove(user);
    return true; // Usuario eliminado con éxito
  }
}
