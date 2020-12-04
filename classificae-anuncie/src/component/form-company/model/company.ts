export class CompanyModel {
    address: Address = new Address();
    contact: Contact = new Contact();
    description: string = '';
    description_all: string = '';
    image_galeria: ImageGaleria[] = [];
    image_logo: string = '';
    information: Information = new Information();
    keywords: string = '';
    know_more: KnowMore[] = [];
    name: string = '';
    segment: string = '';
    password: string = '';
    id?: string;
}

export class ImageGaleria {
    id: number = 0;
    base64: string = '';
}

export class KnowMore {
    description: string = '';
}

export class Address {
    cep: string = '';
    description: string = '';
    map: string = '';
}

export class Contact {
    cel: string = '';
    email: string = '';
    tel: string = '';
}

export class Information {
    payment: Payment = new Payment();
    redes: Redes = new Redes();
    schedule: Schedulue[] = [];
}

export class Payment {
    credit: boolean = false;
    debit: boolean = false;
    money: boolean = false;
}

export class Redes {
    facebook: string = '';
    instagran: string = '';
    whats: string = '';
}

export class Schedulue {
    day_week_start: string = '';
    day_week_end: string = '';
    hour_start: string = '';
    hour_end: string = '';
}


export default CompanyModel;