import { Controller, Post, Body, Res, Param, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { MailService, templates } from '../mailes/mail.service';
import { JwtService } from '../jwts/jwt.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import common from 'src/utils/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mail: MailService,
    private readonly jwt: JwtService,
  ) {}

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userDecode = this.jwt.verifyToken(String(req.headers.token));

      if (userDecode) {
        const serResUser = await this.usersService.findById(userDecode.id);
        if (serResUser.data.updateAt == userDecode.updateAt) {
          if (serResUser.status) {
            if (
              await bcrypt.compare(
                changePasswordDto.oldPassword,
                userDecode.password,
              )
            ) {
              await this.mail.sendMail({
                subject: 'Thay đổi mật khẩu',
                to: userDecode.email,
                html: `
                  <h2>Mật khẩu của bạn sẽ bị thay đổi nếu bấm vào link bên dưới</h2>
                  <a href='${process.env.HOST}:${
                    process.env.PORT
                  }/api/v1/users/authentication-change-password/${this.jwt.createToken(
                    {
                      ...serResUser.data,
                      newPassword: changePasswordDto.newPassword,
                    },
                    '300000',
                  )}'>Xác Nhận</a>
                `,
              });

              return res.status(200).json({
                message: 'Kiểm tra email để xác nhận đổi mật khẩu!',
              });
            } else {
              return res.status(213).json({
                message: 'Mật khẩu không chính xác!',
              });
            }
          }
        }
      }

      return res.status(213).json({
        message: 'Xác thực thất bại!',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    try {
      const serResUser = await this.usersService.findByUserNameOrEmail(
        resetPasswordDto.email,
      );
      if (serResUser) {
        await this.mail.sendMail({
          subject: 'Khôi phục mật khẩu',
          to: resetPasswordDto.email,
          html: `
              <h2>Xác nhận email để nhận mật khẩu khôi phục</h2>
              <a href='${process.env.HOST}:${
                process.env.PORT
              }/api/v1/users/authentication-reset-password/${this.jwt.createToken(
                serResUser.data,
                '300000',
              )}'>Xác Nhận</a>
            `,
        });
        return res.status(200).json({
          message: 'Check email!',
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Get('authentication-reset-password/:token')
  async authenticationResetPassword(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const userDecode = this.jwt.verifyToken(String(token));
      if (userDecode) {
        const serResUser = await this.usersService.findById(userDecode.id);
        if (serResUser.data.updateAt == userDecode.updateAt) {
          if (serResUser.status) {
            if (serResUser.data.updateAt == userDecode.updateAt) {
              const randomPassword = common.generateOTP();
              const serUpdateUser = await this.usersService.update(
                userDecode.id,
                {
                  password: await bcrypt.hash(randomPassword, 10),
                },
              );
              if (serUpdateUser.status) {
                await this.mail.sendMail({
                  subject: 'Khôi phục mật khẩu',
                  to: userDecode.email,
                  html: `
                    <h2>Mật khẩu của bạn là</h2>
                    <span>${randomPassword}</span>
                  `,
                });
                return res.status(200).send('Check your mail!');
              }
            }
          }
        }
      }

      return res.status(213).json({
        message: 'Xác thực thất bại!',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Get('authentication-change-password/:token')
  async authenticationChangePassword(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const userDecode = this.jwt.verifyToken(String(token));
      if (userDecode) {
        const serResUser = await this.usersService.findById(userDecode.id);
        if (serResUser.data.updateAt == userDecode.updateAt) {
          if (serResUser.status) {
            if (serResUser.data.updateAt == userDecode.updateAt) {
              const serUpdateUser = await this.usersService.update(
                userDecode.id,
                {
                  password: await bcrypt.hash(userDecode.newPassword, 10),
                },
              );
              if (serUpdateUser.status) {
                return res.status(200).send('Change Password Ok!');
              }
            }
          }
        }
      }

      return res.status(213).json({
        message: 'Xác thực thất bại!',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Get('email-authentication/:userId/:token')
  async emailAuthentication(
    @Param('userId') userId: string,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const userDecode = this.jwt.verifyToken(token);
      const serResUser = await this.usersService.findById(userId);
      if (serResUser.status && userDecode) {
        if (serResUser.data.updateAt == userDecode.updateAt) {
          if (!serResUser.data.emailAuthentication) {
            const serRes = await this.usersService.update(userId, {
              emailAuthentication: true,
            });
            console.log('serRes', serRes);
            if (serRes.status) {
              /* Mail */
              this.mail.sendMail({
                subject: 'Authentication Email Notice',
                to: serRes.data.email,
                text: `Email đã được liên kết với tài khoản ${serRes.data.userName}`,
              });
            }

            return res
              .status(serRes.status ? 200 : 213)
              .send(serRes.status ? 'ok' : 'fail');
          } else {
            return res.status(213).send('Tài khoản đã kích hoạt email!');
          }
        }
      }
      return res.status(213).send('Email đã hết hạn!');
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Get('resend-email')
  async resendEmail(@Req() req: Request, @Res() res: Response) {
    try {
      const userDecode = this.jwt.verifyToken(String(req.headers.token));
      const serResUser = await this.usersService.findById(userDecode.id);
      if (serResUser.status && userDecode) {
        if (serResUser.data.updateAt == userDecode.updateAt) {
          if (!serResUser.data.emailAuthentication) {
            /* Mail */
            const check = await this.mail.sendMail({
              subject: 'Authentication Email',
              to: serResUser.data.email,
              html: templates.emailConfirm({
                confirmLink: `${process.env.HOST}:${
                  process.env.PORT
                }/api/v1/users/email-authentication/${
                  serResUser.data.id
                }/${this.jwt.createToken(serResUser.data, '300000')}`,
                language: 'vi',
                productName: 'MN Store',
                productWebUrl: 'mnstore.com',
                receiverName: `${serResUser.data.firstName} ${serResUser.data.lastName}`,
              }),
            });
            console.log('check', check);
            return res.status(200).send('Check email');
          } else {
            return res.status(213).send('Tài khoản đã kích hoạt email!');
          }
        }
      }
      return res.status(213).send('Xác thực thất bại');
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const serRes = await this.usersService.findByUserNameOrEmail(
        loginDto.userNameOrEmail,
      );

      if (!serRes.status) {
        return res.status(213).json({
          message: 'Không tìm thấy tài khoản',
        });
      }

      if (serRes.data.status != 'ACTIVE') {
        return res.status(213).json({
          message: `Tài khoản bị ${serRes.data.status}`,
        });
      }

      if (!(await bcrypt.compare(loginDto.password, serRes.data.password))) {
        return res.status(213).json({
          message: 'Mật khẩu không chính xác',
        });
      }

      /* Mail */
      this.mail.sendMail({
        subject: 'Register Authentication Email',
        to: serRes.data.email,
        text: `Tài khoản của bạn vừa được login ở một thiết bị mới`,
      });

      return res.status(200).json({
        token: this.jwt.createToken(serRes.data, '1d'),
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const serRes = await this.usersService.register(createUserDto);
      console.log('id', serRes.data.id);
      if (serRes.status) {
        /* Mail */
        this.mail.sendMail({
          subject: 'Register Authentication Email',
          to: serRes.data.email,
          html: templates.emailConfirm({
            confirmLink: `${process.env.HOST}:${
              process.env.PORT
            }/api/v1/users/email-authentication/${
              serRes.data.id
            }/${this.jwt.createToken(serRes.data, '300000')}`,
            language: 'vi',
            productName: 'MN Store',
            productWebUrl: 'mnstore.com',
            receiverName: `${serRes.data.firstName} ${serRes.data.lastName}`,
          }),
        });
      }

      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      return res.status(500).json({
        message: 'Server Controller Error!',
      });
    }
  }
}
