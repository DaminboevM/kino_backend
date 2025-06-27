import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../type/types";

export const Roles = (...roles: UserRole[] ) => SetMetadata('roles', roles)