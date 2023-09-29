/// <reference types="multer" />
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    create(body: any, createUploadDto: CreateUploadDto, file: Express.Multer.File): Promise<void>;
    uploadFile(files: Array<Express.Multer.File>): void;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUploadDto: UpdateUploadDto): string;
    remove(id: string): string;
}
