export class Resume {
    idUsuario:number;
    codigoUsuario:string;
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    experiences: Experience[] = [];
    educations: Education[] = [];
    otherDetails: string;
    skills: Skill[] = [];
    fechaCodigo:string;
    InstitutoPertenciciente:string
    codigoDocumento:string;
    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
        this.skills.push(new Skill());
    }
}
export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}
export class Education {
    degree: string;
    college: string;
    passingYear: string;
    percentage: number;
}
export class Skill {
    value: string;
}