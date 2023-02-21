import { IsString } from "class-validator";

export class CreateCourseDto {
    @IsString({
        message: 'name necessario'
    })
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString({each: true})
    readonly tags: string[];
}
