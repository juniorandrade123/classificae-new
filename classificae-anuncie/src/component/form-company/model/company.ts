export class CompanyModel {
    _id: string = '';
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
}

export class ImageGaleria {
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
    schedule: string[] = [];
}

export class Payment {
    credit: boolean = false;
    debit: boolean = false;
    money: boolean = false;
}

export class Redes {
    facebook: string = '';
    instagran: string = '';
    twitter: string = '';
}


export default CompanyModel;