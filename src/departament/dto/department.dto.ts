import { MunicipalityDto } from "src/municipality/dto/municipality.dto";

export class DepartmentDto {
    id: number;
    name: string;
    code: number;
  }
  
  export class DepartmentWithMunicipalitiesDto {
    id: number;
    name: string;
    code: number;
    municipalities: MunicipalityDto[];
  }