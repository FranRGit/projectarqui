import { DocumentReference } from "@angular/fire/firestore";

export interface Turno{
    ID: string;
    timestamp: Date;
    estado: string;
    cliente: DocumentReference;
}