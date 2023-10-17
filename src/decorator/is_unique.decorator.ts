import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'isUniqueUsername', async: true })
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaService) {
        this.prisma = new PrismaService()
    }

    async validate(username: string, args: ValidationArguments) {
        const resUser = await this.prisma.user.findUnique({ where: { username: username } });
        return !resUser;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists ${args.constraints[0]}`;
    }
}

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUsernameUniqueConstraint,
        });
    };
}
