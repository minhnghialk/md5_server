import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { uploadFileToStorage } from 'src/firebase';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  // Upload 1 file ảnh
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() body: any,
    createUploadDto: CreateUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    console.log('body', JSON.parse(body.user));
    console.log('body', JSON.parse(body.user).name);
    console.log('body', JSON.parse(body.user).email);

    const url = await uploadFileToStorage(file, 'md5db', file.buffer);
    console.log('url', url);
    const serviceRes = this.uploadsService.create(createUploadDto);
    console.log('serviceRes', serviceRes);
  }

  // Upload nhiều file ảnh
  @Post('/many')
  @UseInterceptors(FilesInterceptor('imgs'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files', files);
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
}
